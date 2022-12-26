export const classNamer = (...args: (string | undefined)[]) =>
	args.filter(Boolean).join(" ");

export const getViewportCenter = (
	zoom: number,
	width: number,
	height: number,
	x: number,
	y: number
) => {
	return { x: x + width / 2 / zoom, y: y + height / 2 / zoom };
};
