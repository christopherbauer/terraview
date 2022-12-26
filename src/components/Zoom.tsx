import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

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
		<div className="zoom-container">
			<button onClick={onZoomDecrease}>
				<FontAwesomeIcon icon={faMinus} />
			</button>
			<div>{zoomLevel}x</div>
			<button onClick={onZoomIncrease}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	);
};
