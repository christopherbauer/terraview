import { FC } from "react";
import { useAdjusted } from "../../hooks/useAdjusted";
import { AWSEcr } from "../icons/aws-ecr";
import { Box, Coord, Unit } from "../types";

type ECRElement = Coord & Box;
export const ECR: FC<ECRElement> = (props) => {
	const { x, y } = useAdjusted(props);
	const { x: width, y: height } = useAdjusted({
		x: props.width,
		y: props.height,
	});
	const color = "white";
	return (
		<g style={{ stroke: color, fill: color }} transform={`translate(${x} ${y})`}>
			<rect
				style={{ pointerEvents: "none" }}
				width={width}
				height={height}
				rx={Unit / 2}
				opacity={0.2}
				fill={color}
			></rect>
			<AWSEcr width={5 * Unit} height={5 * Unit} />
		</g>
	);
};
