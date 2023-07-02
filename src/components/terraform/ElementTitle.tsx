import { PropsWithChildren, useMemo } from "react";
import { ResourceInfo } from "../../decoder";
import { PathBuilder } from "../helpers";
import { Unit } from "../types";

interface ElementBodyProps extends PropsWithChildren {}
export const ElementBody = ({ children }: ElementBodyProps) => {
	return <g transform={`translate(0, ${Unit})`}>{children}</g>;
};
interface ElementTitleProps extends PropsWithChildren {
	width: number;
	info: ResourceInfo;
}
export const ElementTitle = ({ width, info, children }: ElementTitleProps) => {
	const titlePath = useMemo(() => {
		const builder = new PathBuilder();
		builder.moveTo(0, Unit);
		builder.lineTo(width, Unit);
		return builder.build();
	}, [width]);
	// const isModule = useMemo(() => info.module !== undefined, [info.module]);
	return (
		<>
			<text x={Unit / 2} y={Unit / 2} width={width * Unit - 1} dominantBaseline={"middle"}>
				{children}
			</text>
			<text x={width - Unit} y={Unit / 2} onClick={() => console.log(info)}>
				?
			</text>
			<path d={titlePath} />
		</>
	);
};
