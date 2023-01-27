import { PropsWithChildren } from "react";
import { VPCDefinition } from "../../definitions";
import { Coord, Box } from "../types";

export interface VPCElement
	extends PropsWithChildren<Coord & Box & VPCDefinition> {
	layer?: number;
	theme?: VPC_THEME;
}
export enum VPC_THEME {
	"blacks" = 0,
	"pastels" = 1,
}
export const VPC_THEMES: Record<VPC_THEME, string[]> = {
	[VPC_THEME.blacks]: ["#000", "#111", "#222", "#333"],
	[VPC_THEME.pastels]: [
		"#d5d6ea",
		"#f6f6eb",
		"#d7ecd9",
		"#f5d5cb",
		"#f6ecf5",
		"#f3ddf2",
	],
};
