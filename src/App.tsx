import React, { useCallback, useState } from "react";
import "./App.css";
import { SVGContainer } from "./components/SVGContainer";
import { Zoom, zoomSteps } from "./components/Zoom";
import { Direction, OnZoom } from "./components/types";

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
			<header className="App-header">
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
			<div>
				<SVGContainer
					zoom={zoom}
					includeGrid={true}
					width={800}
					height={600}
					onZoom={handleZoomStep}
				/>
				<Zoom
					zoomLevel={zoom}
					onZoomIncrease={() => handleZoomStep(Direction.Up)}
					onZoomDecrease={() => handleZoomStep(Direction.Down)}
				/>
			</div>
		</div>
	);
};

export default App;
