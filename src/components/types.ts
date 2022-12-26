import React from "react";

export enum Direction {
	Up = "Up",
	Down = "Down",
}

export type OnMousePositionChanged = (offsetX: number, offsetY: number) => void;
export type OnDimensionChanged = (width: number, height: number) => void;
export type OnDoubleClick = (x: number, y: number) => void;
export type OnSetContextMenuOptions = (items: React.ReactElement[]) => void;
export type OnZoom = (direction: Direction) => void;
export type OnPanningEnd = (panX: number, panY: number) => void;
