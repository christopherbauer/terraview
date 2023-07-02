import { PropsWithChildren } from "react";
import { Themed } from "..";
import { ResourceInfo } from "../../../decoder";
import { VPCDefinition } from "../../../definitions";
import { Coord, Box } from "../../types";

export interface VPCElement extends PropsWithChildren<Coord & Box & VPCDefinition & Themed> {
	layer?: number;
	info: ResourceInfo;
}
