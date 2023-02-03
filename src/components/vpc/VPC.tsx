import { FC, useMemo } from "react";
import styled from "styled-components";
import { VPCElement, VPC_THEME, VPC_THEMES } from ".";
import { useAdjusted } from "../../hooks/useAdjusted";
import { PathBuilder } from "../helpers";
import { Unit } from "../types";
export const VPC: FC<VPCElement> = ({ layer = 0, theme = VPC_THEME.pastels, ...props }) => {
	const { cidr } = props;
	const { x, y } = useAdjusted(props);
	const { x: width, y: height } = useAdjusted({
		x: props.width,
		y: props.height,
	});
	const color = useMemo(() => VPC_THEMES[theme][layer], [layer, theme]);
	const titlePath = useMemo(() => {
		const builder = new PathBuilder();
		builder.moveTo(0, Unit);
		builder.lineTo(width, Unit);
		return builder.build();
	}, [width]);
	return (
		<g style={{ stroke: color, fill: color }} transform={`translate(${x} ${y})`}>
			<VPCRect
				style={{ pointerEvents: "none" }}
				width={width}
				height={height}
				rx={Unit / 2}
				opacity={0.2}
				fill={color}
			></VPCRect>
			<path d={titlePath} />
			<text x={Unit / 2} y={Unit / 2} dominantBaseline={"middle"}>
				VPC - {cidr}
			</text>
			{props.children}
		</g>
	);
};
const VPCRect = styled.rect`
	pointerevents: none;
`;
