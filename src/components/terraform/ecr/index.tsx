import { FC } from "react";
import { ResourceInfo } from "../../../decoder";
import { useAdjusted } from "../../../hooks/useAdjusted";
import { AWSEcr } from "../../icons/aws-ecr";
import { Box, Coord, Unit } from "../../types";
import { ElementTitle } from "../ElementTitle";

type ECRElement = Coord & Box & { name?: string; info: ResourceInfo };
export const ECR: FC<ECRElement> = (props) => {
	const { name, info } = props;
	const [x, y, width, height] = useAdjusted(props.x, props.y, props.width, props.height);
	const color = "orange";

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
			<ElementTitle info={info} width={width}>
				ECR - {name}
			</ElementTitle>
			<g transform={`translate(${2 * Unit} ${2 * Unit})`}>
				<AWSEcr width={2 * Unit} height={2 * Unit} />
			</g>
		</g>
	);
};
