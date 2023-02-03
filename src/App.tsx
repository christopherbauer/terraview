import React, { useCallback, useState } from "react";
import "./App.css";
import { Zoom, zoomSteps } from "./components/Zoom";
import { Direction, OnZoom } from "./components/types";
import { SVGContainer, VPC } from "./components";
import styled from "styled-components";
import { UploadButton } from "./components/UploadButton";
import { VPCElement } from "./components/vpc";
import { TfStateDecoder } from "./components/TfStateDecoder";

const App = () => {
	const [zoom, setZoom] = useState(1);
	const [tfStateFile, setTfStateFile] = useState<File>();
	const handleTfStateFileChanged = useCallback(async (file: File) => {
		setTfStateFile(file);
	}, []);
	const handleZoomStep: OnZoom = useCallback(
		(direction) => {
			const curIndex = zoomSteps.findIndex((predicate) => predicate === zoom);
			const nextIndex = curIndex + (direction === Direction.Up ? 1 : -1);
			if (nextIndex in zoomSteps) {
				setZoom(zoomSteps[nextIndex]);
			}
		},
		[zoom]
	);
	return (
		<div>
			<Header>
				<UploadButton file={tfStateFile} onFileUploaded={handleTfStateFileChanged} />
			</Header>
			<div>
				<SVGContainer
					zoom={zoom}
					includeGrid={true}
					width={window.outerWidth * 1.2}
					height={window.outerHeight * 1.2}
					onZoom={handleZoomStep}
				>
					<TfStateDecoder file={tfStateFile} />
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
