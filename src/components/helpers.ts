//Useful Ref - https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
export class PathBuilder {
	private _path: string[] = [];
	private _logPath: boolean;
	constructor(logPath?: boolean) {
		this._logPath = logPath || false;
	}
	moveTo = (x: number, y: number) => {
		if (this._logPath) {
			console.log({ x, y });
		}
		this._path.push(`M ${x} ${y}`);
		return this;
	};
	quadCurveTo = (x: number, y: number, curveX: number, curveY: number) => {
		this._path.push(`Q ${curveX} ${curveY}, ${x} ${y}`);
		return this;
	};
	tQuadCurveTo = (x: number, y: number) => {
		if (!this._path[this._path.length - 1].startsWith("Q")) {
			throw new Error(
				"tQuadCurveTo can only be called directly after a quadCurveTo"
			);
		}
		this._path.push(`T ${x} ${y}`);
		return this;
	};
	lineTo = (x: number, y: number) => {
		if (this._logPath) {
			console.log({ x, y });
		}
		this._path.push(`L ${x} ${y}`);
		return this;
	};
	endAtStart = () => {
		if (this._logPath) {
			console.log("Return to Start");
		}
		this._path.push("Z");
		return this;
	};
	build = () => this._path.join(" ");
}
