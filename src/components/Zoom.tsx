import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import styled from "styled-components";

interface ZoomProps {
	zoomLevel: number;
	onZoomIncrease: () => void;
	onZoomDecrease: () => void;
}
export const zoomSteps = [
	0.1, 0.15, 0.25, 0.35, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 5, 10,
];
export const Zoom: FC<ZoomProps> = (props) => {
	const { zoomLevel, onZoomIncrease, onZoomDecrease } = props;
	return (
		<ZoomContainer>
			<Button onClick={onZoomDecrease}>
				<FontAwesomeIcon icon={faMinus} />
			</Button>
			<ZoomLevel>{zoomLevel}x</ZoomLevel>
			<Button onClick={onZoomIncrease}>
				<FontAwesomeIcon icon={faPlus} />
			</Button>
		</ZoomContainer>
	);
};
const ZoomLevel = styled.div`
	font-weight: 600;
	margin: 0 1em;
`;
const Button = styled.button`
	outline: none;
	background: none;
	border: none;
	border-radius: 1em;
	background-color: white;
	box-shadow: inset 0 0 10px gray;
	padding: 0.25em 0.65em;

	&:hover {
		background-color: lightblue;
	}
`;
const ZoomContainer = styled.div`
	position: fixed;
	display: flex;
	width: 100%;

	flex-direction: row;
	justify-content: center;
	align-items: center;
	bottom: 2em;
	color: white;
`;
