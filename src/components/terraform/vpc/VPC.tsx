import { FC, useMemo } from "react";
import styled from "styled-components";
import { VPCElement } from ".";
import { THEME, THEMES } from "..";
import { useAdjusted } from "../../../hooks/useAdjusted";
import { Unit } from "../../types";
import { ElementBody, ElementTitle } from "../ElementTitle";
export const VPC: FC<VPCElement> = ({ layer = 0, theme = THEME.pastels, ...props }) => {
	const { cidr, info } = props;
	const [x, y, width, height] = useAdjusted(props.x, props.y, props.width, props.height);
	const color = useMemo(() => THEMES[theme][layer], [layer, theme]);
	const tags = info.instances[0].attributes.tags;
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
			<ElementTitle info={info} width={width}>
				VPC - {cidr}
			</ElementTitle>
			<ElementBody>
				{tags && (
					<foreignObject width={width} height={height}>
						<span>Tags</span>
						<br />
						{Object.entries(tags).map((t) => (
							<Pill>
								{t[0]} - {t[1]}
							</Pill>
						))}
					</foreignObject>
				)}
			</ElementBody>

			{props.children}
		</g>
	);
};
const Pill = styled.span`
	font-size: 0.8em;
	display: block;
	border: 1px solid lightgreen;
	background: lightgreen;
	border-radius: 5px;
`;
const VPCRect = styled.rect`
	pointerevents: none;
`;
