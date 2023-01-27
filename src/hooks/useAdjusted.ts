import { useMemo } from "react";
import { Coord, Unit } from "../components/types";

export const useAdjusted: (coord: Coord) => Coord = (coord) => {
	const { x, y } = coord;
	const adjustedX = useMemo(() => x * Unit, [x]);
	const adjustedY = useMemo(() => y * Unit, [y]);
	return { x: adjustedX, y: adjustedY };
};
