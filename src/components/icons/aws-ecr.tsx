import styled, { css } from "styled-components";

type Size = { width: number; height: number };
export const AWSEcr = ({ width, height }: Size) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 85 85"
			fill="#fff"
			fillRule="evenodd"
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
			width={width}
			height={height}
		>
			<use xlinkHref="#A" x="2.5" y="2.5" />
			<symbol id="A" overflow="visible">
				<g fill="#9d5025">
					<path d="M0 41.579C0 20.293 17.84 3.157 40 3.157s40 17.136 40 38.422S62.16 80 40 80 0 62.864 0 41.579z" />
					<path d="M0 38.422h80v3.157H0z" />
				</g>
				<FilledPath
					d="M0 38.422C0 17.136 17.84 0 40 0s40 17.136 40 38.422-17.84 38.422-40 38.422S0 59.707 0 38.422z"
					outline={false}
				/>
				<NoOutlinePath d="M42.589 34.255h-5.166L34.65 11.364h10.713l-2.774 22.891z" />
				<NoOutlinePath d="M63.135 51.111l2.064-1.641-7.48-10.732-16.379-5.492L40 41.932l14.762 1.326 8.373 7.853z" />
				<NoOutlinePath d="M16.865 51.111l-2.051-1.641 7.466-10.732 16.379-5.492L40 41.932l-14.762 1.326-8.373 7.853zm15.708-39.747c0-3.952 3.312-7.134 7.427-7.134s7.427 3.182 7.427 7.134-3.312 7.134-7.427 7.134-7.427-3.182-7.427-7.134z" />
				<FilledPath
					d="M40 19.129c-4.465 0-8.084-3.477-8.084-7.765S35.535 3.599 40 3.599s8.084 3.476 8.084 7.765c-.007 4.286-3.622 7.758-8.084 7.765zm0-14.268c3.739 0 6.77 2.911 6.77 6.503s-3.031 6.502-6.77 6.502-6.77-2.911-6.77-6.502S36.261 4.862 40 4.862h0zm-2.432 6.503c0-1.294 1.085-2.336 2.432-2.336s2.432 1.042 2.432 2.336S41.347 13.7 40 13.7s-2.432-1.042-2.432-2.336z"
					outline={false}
				/>
				<NoOutlinePath d="M34.65 37.5c0-2.847 2.386-5.139 5.35-5.139s5.35 2.292 5.35 5.139-2.386 5.139-5.35 5.139-5.35-2.292-5.35-5.139z" />
				<FilledPath
					d="M40 43.27c-3.312-.007-5.994-2.588-5.994-5.77s2.682-5.763 5.994-5.77 6.006 2.563 6.02 5.745c.004 1.536-.629 3.01-1.759 4.097S41.599 43.27 40 43.27zm0-10.29c2.592-.007 4.699 2.005 4.706 4.495s-2.088 4.513-4.679 4.52-4.699-2.005-4.706-4.495 2.088-4.513 4.679-4.52zm-1.643 4.52c0-.874.733-1.578 1.643-1.578s1.643.704 1.643 1.578-.733 1.578-1.643 1.578-1.643-.704-1.643-1.578z"
					outline={false}
				/>
				<NoOutlinePath d="M22.741 49.344H57.26v18.321H22.741z" />
			</symbol>
			<defs>
				<path id="C" d="M24.476 50.821h2.629v15.366h-2.629z" />
			</defs>
		</svg>
	);
};
export const NoOutlinePath = styled.path`
	stroke: none;
`;
export const FilledPath = styled.path<{ outline: boolean }>`
	fill: #f58536
		${(p) =>
			p.outline
				? css`
						stroke: none;
				  `
				: ""};
`;
