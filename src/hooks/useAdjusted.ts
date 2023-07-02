import { Unit } from "../components/types";

export const useAdjusted: (...nums: number[]) => number[] = (...nums) => {
	return nums.map((n) => (n * Unit) as number);
};
