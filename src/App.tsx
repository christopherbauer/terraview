import React, { useCallback, useState } from "react";
import "./App.css";
import { Zoom, zoomSteps } from "./components/Zoom";
import { Direction, OnZoom } from "./components/types";
import { SVGContainer, VPC } from "./components";
import styled from "styled-components";

const App = () => {
	const [zoom, setZoom] = useState(1);
	const handleZoomStep: OnZoom = useCallback(
		(direction) => {
			const curIndex = zoomSteps.findIndex(
				(predicate) => predicate === zoom
			);
			const nextIndex = curIndex + (direction === Direction.Up ? 1 : -1);
			if (nextIndex in zoomSteps) {
				setZoom(zoomSteps[nextIndex]);
			}
		},
		[zoom]
	);
	return (
		<div className="App">
			<Header className="App-header">
				<button onClick={() => {}}>Load .tfstate</button>
			</Header>
			<div>
				<SVGContainer
					zoom={zoom}
					includeGrid={true}
					width={window.outerWidth * 1.2}
					height={window.outerHeight * 1.2}
					onZoom={handleZoomStep}
				>
					<VPC
						x={22}
						y={1}
						width={20}
						height={20}
						cidr={"1.3.0.0/8"}
					></VPC>
					<VPC x={1} y={1} width={20} height={20} cidr={"1.2.0.0/8"}>
						<VPC
							x={1}
							y={2}
							width={6}
							height={6}
							cidr={"1.2.1.0/16"}
							layer={1}
						></VPC>
						<VPC
							x={1}
							y={9}
							width={6}
							height={6}
							cidr={"1.2.2.0/16"}
							layer={1}
						></VPC>
						<VPC
							x={8}
							y={2}
							width={6}
							height={6}
							cidr={"1.2.3.0/16"}
							layer={1}
						></VPC>
						<VPC
							x={8}
							y={9}
							width={6}
							height={6}
							cidr={"1.2.4.0/16"}
							layer={1}
						></VPC>
					</VPC>
				</SVGContainer>
				<Zoom
					zoomLevel={zoom}
					onZoomIncrease={() => handleZoomStep(Direction.Up)}
					onZoomDecrease={() => handleZoomStep(Direction.Down)}
				/>
			</div>
		</div>
	);
};
const Header = styled.header`
	background-color: #282c34;
	min-height: 5vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
`;
export default App;
