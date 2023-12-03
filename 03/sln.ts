// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
const debug = true;

type RGB = {
	r: number;
	g: number;
	b: number;
}
const COLORS = ['red', 'green', 'blue'] as const;
type Color = typeof COLORS[number];


const parseColor = (s: string, c: Color): number => {
	if (s.indexOf(c) > -1) {
		return parseInt(s.replace(c, '').trim()) || 0;
	}
	return 0;
}

const parseRun = (s: string): RGB => {
	const colors = s.split(',');
	const n: RGB = {
		r: colors.reduce((res, c) => res || parseColor(c, 'red'), 0),
		g: colors.reduce((res, c) => res || parseColor(c, 'green'), 0),
		b: colors.reduce((res, c) => res || parseColor(c, 'blue'), 0),
	}
	return n;
}

const parseLine = (s: string): RGB[] => {
	const [p1, p2] = s.split(':');
	const runs = p2.split(';');
	return runs.map(parseRun);
}

const isValid = ({r, g, b}: RGB, limit: RGB): boolean => {
	return r <= limit.r && g <= limit.g && b <= limit.b;
}

console.clear();


let arr = input.toLowerCase().split('\n') as string[];
if (debug) {
	// arr = ['nine4pvtl','twonetwone', 'eightnineseventwo1sevenine', ...arr];
	// arr = arr.splice(0, 5);
} else {
	console.debug = () => null;
}

const LIMIT: RGB = {
	r: 12,
	g: 13,
	b: 14
}

const parseGameNumber = (s: string): number => {
	const [_, nstr] = s.split('game');
	return parseInt(nstr.trim());
}

const result1 = arr.filter(Boolean)
	.reduce((result, s) => {
		const game = parseLine(s);
		const {r,g,b}: RGB = game.reduce((rgb, game) => {
			if (isValid(game, rgb)) {
				return rgb;
			} else {
				return ({
					r: Math.max(rgb.r, game.r),
					g: Math.max(rgb.g, game.g),
					b: Math.max(rgb.b, game.b),
				})
			}
		}, {r: 0, g: 0, b: 0});

		return result + (r * g * b);
	}, 0);

console.log(result1)

