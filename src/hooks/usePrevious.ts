import { useRef, useEffect } from "react";

type UsePreviousType = String | Number | Date | boolean;
export const usePrevious: <T extends UsePreviousType>(value: T) => T | null = <
	T extends UsePreviousType
>(
	value: T
) => {
	const ref = useRef<T | null>(null);
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};
