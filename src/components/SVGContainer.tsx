import React, {
	FC,
	useRef,
	useState,
	useMemo,
	useCallback,
	useEffect,
	CSSProperties,
	RefObject,
	LegacyRef,
} from "react";
import styled from "styled-components";
import { getViewportCenter } from "../helpers";
import { usePrevious } from "../hooks";
import {
	Direction,
	OnDimensionChanged,
	OnDoubleClick,
	OnMousePositionChanged,
	OnPanningEnd,
	OnZoom,
	Unit,
} from "./types";

interface SVGContainerProps
	extends Omit<
		React.SVGProps<SVGSVGElement>,
		"onDoubleClick" | "onMouseMove" | "onMouseUp" | "onMouseDown"
	> {
	zoom: number;
	debug?: boolean;
	centerOnOrigin?: boolean;
	includeGrid?: boolean;
	onDoubleClick?: OnDoubleClick;
	onZoom?: OnZoom;
	onPanningStart?: () => void;
	onPanningEnd?: OnPanningEnd;
	onContainerDimensionChanged?: OnDimensionChanged;
	onMousePositionChanged?: OnMousePositionChanged;
	onMouseMove?: React.MouseEventHandler<HTMLDivElement> | undefined;
	onMouseUp?: React.MouseEventHandler<HTMLDivElement> | undefined;
	onMouseDown?: React.MouseEventHandler<HTMLDivElement> | undefined;
	onRefChanged?: (ref: React.RefObject<SVGSVGElement>) => void;
}
export const SVGContainer: FC<SVGContainerProps> = (props) => {
	const {
		children,
		zoom,
		debug,
		centerOnOrigin,
		includeGrid,
		className,
		onDoubleClick,
		onZoom,
		onPanningStart,
		onContainerDimensionChanged,
		onMousePositionChanged,
		onPanningEnd,
		onMouseMove,
		onMouseDown,
		onMouseUp,
		onRefChanged,
		...rest
	} = props;
	const svgContainerRef = useRef<HTMLDivElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);
	const [containerHeight, setContainerHeight] = useState<number>(0);
	const [containerWidth, setContainerWidth] = useState<number>(0);
	const [panningOffset, setPanningOffset] = useState<{
		offsetX: number;
		offsetY: number;
	}>({ offsetX: 0, offsetY: 0 });
	const [draggingOffset, setDraggingOffset] = useState<
		{ offsetX: number; offsetY: number } | undefined
	>(undefined);
	const [ongoingPanning, setOngoingPanning] = useState<{
		offsetX: number;
		offsetY: number;
	}>({ offsetX: 0, offsetY: 0 });
	const [viewportCenter, setViewportCenter] = useState<{
		x: number;
		y: number;
	}>();
	const prevZoom = usePrevious(zoom);
	const xPan = useMemo(
		() => (panningOffset?.offsetX || 0) + (ongoingPanning?.offsetX || 0),
		[ongoingPanning?.offsetX, panningOffset?.offsetX]
	);
	const yPan = useMemo(
		() => (panningOffset?.offsetY || 0) + (ongoingPanning?.offsetY || 0),
		[ongoingPanning?.offsetY, panningOffset?.offsetY]
	);
	// const onResize = useCallback(() => {
	// 	let localRef = svgContainerRef.current;
	// 	if (localRef) {
	// 		const clientRect = localRef.getBoundingClientRect();
	// 		const height = clientRect.height,
	// 			width = clientRect.width;
	// 		setContainerHeight(height - 2);
	// 		setContainerWidth(width - 3);
	// 		onContainerDimensionChanged?.(width, height);
	// 	}
	// }, [onContainerDimensionChanged]);
	// useEffect(() => {
	// 	onResize();
	// 	window.addEventListener("resize", onResize);
	// 	return () => window.removeEventListener("resize", onResize);
	// }, [onResize]);
	useEffect(() => {
		setViewportCenter(
			getViewportCenter(zoom, containerWidth, containerHeight, xPan, yPan)
		);
	}, [containerHeight, containerWidth, xPan, yPan, zoom]);
	useEffect(() => {
		if (zoom !== prevZoom && prevZoom && panningOffset) {
			setPanningOffset({
				offsetX: (panningOffset.offsetX * prevZoom) / zoom,
				offsetY: (panningOffset.offsetY * prevZoom) / zoom,
			});
		}
	}, [panningOffset, prevZoom, zoom]);
	useEffect(() => {
		if (svgRef.current) {
			onRefChanged?.(svgRef);
		}
	}, [onRefChanged]);
	useEffect(() => {
		if (centerOnOrigin) {
			setPanningOffset({
				offsetX: -containerWidth,
				offsetY: -containerHeight,
			});
		} else {
			setPanningOffset({ offsetX: 0, offsetY: 0 });
		}
	}, [centerOnOrigin, containerHeight, containerWidth]);

	useEffect(() => {
		const { offsetX: panningX, offsetY: panningY } = panningOffset;
		const { offsetX: ongoingX, offsetY: ongoingY } = ongoingPanning;
		onPanningEnd?.(panningX + ongoingX, panningY + ongoingY);
	}, [onPanningEnd, ongoingPanning, panningOffset]);
	const handleDoubleClick: React.MouseEventHandler<HTMLDivElement> = (
		event
	) => {
		event.preventDefault();
		const { nativeEvent } = event;
		const { offsetX, offsetY } = nativeEvent;

		onDoubleClick?.(offsetX, offsetY);
	};
	const handleWheelEvent: React.WheelEventHandler<HTMLDivElement> = (
		event
	) => {
		const { deltaY } = event;
		const direction = deltaY <= 0 ? Direction.Up : Direction.Down;
		onZoom?.(direction);
	};
	const handleStartTracking: React.MouseEventHandler<HTMLDivElement> = (
		event
	) => {
		if (event.target === svgRef.current) {
			const { nativeEvent } = event;
			const { offsetX, offsetY } = nativeEvent;
			setDraggingOffset({
				offsetX: offsetX / zoom,
				offsetY: offsetY / zoom,
			});
			onPanningStart?.();
		} else {
			onMouseDown?.(event);
		}
	};
	const handleOngoingTracking: React.MouseEventHandler<HTMLDivElement> =
		useCallback(
			(event) => {
				if (event.target === svgRef.current) {
					const { nativeEvent } = event;
					const {
						offsetX: mouseMoveOffsetX,
						offsetY: mouseMoveOffsetY,
					} = nativeEvent;
					//TODO: look in to throttling these callbacks per Andrew
					if (draggingOffset) {
						const { offsetX, offsetY } = draggingOffset;
						const xDiff = offsetX - mouseMoveOffsetX / zoom;
						const yDiff = offsetY - mouseMoveOffsetY / zoom;
						setOngoingPanning({ offsetX: xDiff, offsetY: yDiff });
					}
					onMousePositionChanged?.(
						mouseMoveOffsetX,
						mouseMoveOffsetY
					);
				} else {
					onMouseMove?.(event);
				}
			},
			[draggingOffset, onMouseMove, onMousePositionChanged, zoom]
		);
	const handleEndTracking: React.MouseEventHandler<HTMLDivElement> =
		useCallback(
			(event) => {
				if (event.target === svgRef.current) {
					const { nativeEvent } = event;
					const { offsetX: mouseUpOffsetX, offsetY: mouseUpOffsetY } =
						nativeEvent;
					if (draggingOffset) {
						const { offsetX, offsetY } = draggingOffset;
						setPanningOffset((prev) => {
							const xPan =
								prev.offsetX +
								(offsetX - mouseUpOffsetX / zoom);
							const yPan =
								prev.offsetY +
								(offsetY - mouseUpOffsetY / zoom);
							return { offsetX: xPan, offsetY: yPan };
						});
						setDraggingOffset(undefined);
						setOngoingPanning({ offsetX: 0, offsetY: 0 });
					}
				} else {
					onMouseUp?.(event);
				}
			},
			[draggingOffset, onMouseUp, zoom]
		);
	const viewBox = useMemo(() => {
		const zoomX = Number(props.width) / zoom;
		const zoomY = Number(props.height) / zoom;
		return `${xPan} ${yPan} ${zoomX} ${zoomY}`;
	}, [props.height, props.width, xPan, yPan, zoom]);

	const localStyle = useMemo(() => {
		if (includeGrid) {
			if (props.style) {
				console.warn("Style overidden by includeGrid prop");
			}
			const gridColor = "#eeeeee22";
			return Object.assign(props.style || {}, {
				backgroundColor: "#888888ff",
				backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
				backgroundSize: `${zoom * Unit}px ${zoom * Unit}px`,
				backgroundPosition: `top ${-1 * yPan}px left ${-1 * xPan}px`,
			} as CSSProperties);
		}
		return props.style;
	}, [includeGrid, props.style, xPan, yPan, zoom]);
	const gridHelpers = useMemo(() => {
		const gridlines = (
			<g key="grid">
				<line
					x1={0}
					x2={0}
					y1={containerHeight}
					y2={-containerHeight}
					stroke="red"
					strokeWidth={2}
				/>
				<line
					x1={-containerWidth}
					x2={containerWidth}
					y1={0}
					y2={0}
					stroke="red"
					strokeWidth={2}
				/>
			</g>
		);
		const centerViewportIcon = viewportCenter && (
			<g
				key="center-viewport"
				style={{
					pointerEvents: "none",
					transform: `translate(${viewportCenter.x}px, ${viewportCenter.y}px)`,
				}}
			>
				<circle stroke="red" strokeWidth={3} r={2}></circle>
				<text y={20}>
					{viewportCenter.x}, {viewportCenter.y}
				</text>
			</g>
		);
		const x = 0,
			y = 0;
		const zeroZeroIcon = (
			<g key="zero-zero">
				<circle stroke="red" strokeWidth={3} r={2}></circle>
				<text style={{ pointerEvents: "none" }} y={20}>
					{x}, {y}
				</text>
			</g>
		);
		const topLeftIcon = (
			<g
				key="top-left"
				style={{ transform: `translate(${xPan}px, ${yPan}px)` }}
			>
				<circle stroke="red" strokeWidth={3} r={2}></circle>
				<text style={{ pointerEvents: "none" }} y={20}>
					{xPan}, {yPan}
				</text>
			</g>
		);

		return [gridlines, centerViewportIcon, zeroZeroIcon, topLeftIcon];
	}, [containerHeight, containerWidth, viewportCenter, xPan, yPan]);
	return (
		<>
			{debug && (
				<>
					<label>Offset</label>
					{panningOffset?.offsetX} {panningOffset?.offsetY}
					<label>Pan</label>
					{xPan} {yPan}
				</>
			)}
			<SvgContainer
				ref={svgContainerRef}
				onDoubleClick={handleDoubleClick}
				onMouseDown={handleStartTracking}
				onMouseMove={handleOngoingTracking}
				onMouseUp={handleEndTracking}
				onWheel={handleWheelEvent}
			>
				<SvgSurface
					ref={svgRef}
					style={localStyle}
					viewBox={viewBox}
					{...rest}
				>
					{debug && gridHelpers}
					{children}
				</SvgSurface>
			</SvgContainer>
		</>
	);
};
const SvgContainer = styled.div`
	display: block;
	border: solid @border-width gray; //remove for borderless
	display: flex;
`;

const SvgSurface = styled.svg<{
	ref: any;
}>`
	cursor: move;
	flex-grow: 1;
	width: 100%;
	height: 100%;
`;
