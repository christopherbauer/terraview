import { PropsWithChildren } from "react";
import { Themed } from "..";
import { ResourceInfo } from "../../../decoder";
import { SubnetDefinition } from "../../../definitions";
import { Coord, Box } from "../../types";
export interface SubnetElement extends PropsWithChildren<Coord & Box & SubnetDefinition & Themed> {
	layer?: number;
	info: ResourceInfo;
}
