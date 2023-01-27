const shortHex = new RegExp(/#[0-9a-zA-Z]{3}/);
export const expander = (hex: string) =>
	shortHex.test(hex)
		? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
		: hex;

const hexValues = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
];
const hv = (hex: string) => hexValues.findIndex((v) => v === hex);
interface RGB {
	r: number;
	g: number;
	b: number;
}

export const hexToRGB = (hex: string) =>
	expander(hex)
		.split("")
		.reduce<RGB>(
			(prev, cur, i) => {
				switch (i) {
					case 0:
					case 1:
						prev.r += hv(cur) * (i % 2 ? 16 : 1);
						break;
					case 2:
					case 3:
						prev.g += hv(cur) * (i % 2 ? 16 : 1);
						break;
					case 4:
					case 5:
						prev.b += hv(cur) * (i % 2 ? 16 : 1);
						break;
				}
				return prev;
			},
			{ r: 0, g: 0, b: 0 }
		);
interface HSV {
	h: number;
	s: number;
	l: number;
}
export const rgbToHSL: (rgb: RGB) => HSV = (rgb) => {
	const rNormalized = rgb.r / 255;
	const gNormalized = rgb.g / 255;
	const bNormalized = rgb.b / 255;
	const cmax = Math.max(rNormalized, gNormalized, bNormalized);
	const cmin = Math.min(rNormalized, gNormalized, bNormalized);
	const delta = cmax - cmin;

	let hue = 0;
	if (cmax === rNormalized) {
		hue = (60 * ((gNormalized - bNormalized) / delta) + 360) % 360;
	}
	if (cmax === gNormalized) {
		hue = (60 * ((bNormalized - rNormalized) / delta) + 120) % 360;
	}
	if (cmax === bNormalized) {
		hue = (60 * ((rNormalized - gNormalized) / delta) + 240) % 360;
	}

	let saturation = 0;
	if (cmax === 0) {
		saturation = 0;
	}
	saturation = (delta / cmax) * 100;
	const lightness = Math.round(((cmax + cmin) / 2) * 100);
	return {
		h: hue,
		s: saturation,
		l: lightness,
	};
};
