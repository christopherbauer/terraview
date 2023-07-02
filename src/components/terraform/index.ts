import { ECR } from "./ecr";
import { VPC } from "./vpc/VPC";
export interface Themed {
	theme?: THEME;
}
export enum THEME {
	"blacks" = 0,
	"pastels" = 1,
}
export const THEMES: Record<THEME, string[]> = {
	[THEME.blacks]: ["#000", "#111", "#222", "#333"],
	[THEME.pastels]: ["#d5d6ea", "#f6f6eb", "#d7ecd9", "#f5d5cb", "#f6ecf5", "#f3ddf2"],
};

export { ECR, VPC };
