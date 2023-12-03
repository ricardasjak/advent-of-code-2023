// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
const debug = true;
console.clear();
console.log('---------');
const DOT = '.';
const STAR = '*';

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

type Matrix = Array<Array<string>>;
type Zone = {
	x: number;
	y: number;
	char: string;
}

const isDigit = (c: string) => c >= '0' && c <= '9';
const isSymbol = (c: string) => !isDigit(c) && c !== DOT;
const exists = (matrix: Matrix, y, x): boolean => {
	return !(typeof matrix[y] === 'undefined' || typeof matrix[y][x] === 'undefined');
}

const buildMatrix = (arr: string[]): Matrix => {
	return arr.reduce((r, s) => {
		r.push(s.split(''));
		return r;
	}, []);
}

const buildZones = (m: Matrix): Array<Array<Zone>> => {
	const zones: Array<Array<Zone | undefined>> = m.map(line => line.map(c => ({ char: '', y: -1, x: -1 }))); //default "empty" zone
	m.forEach((line, i) => {
		line.forEach((c, j) => {
			if (isSymbol(c)) {
				const zoneCenter: Zone = {
					char: c,
					x: j,
					y: i,
				}
				zones[i][j] = { ...zoneCenter };
				for (let y = -1; y <= 1; y++) {
					for (let x = -1; x <= 1; x++) {
						if (exists(m, i + y, j + x)) {
							if (zones[i + y][j + x].char !== STAR) {
								zones[i + y][j + x] = { ...zoneCenter };
							}
						}
					}
				}
			}
		})
	});
	return zones;
}

const groupNumbersWithZones = (m: Matrix, zones: Array<Array<Zone>>): Array<{ n: number; zone: Zone }> => {
	let numbers: Array<{ n: number; zone: Zone | undefined }> = [];
	m.forEach((line, i) => {
		let n = 0;
		let zone: Zone | undefined;
		line.forEach((c, j) => {
			if (isDigit(c)) {
				n = n * 10 + Number(c);
				zone = zone?.char ? zone : zones[i][j];
			}
			// not digit or last
			if (!isDigit(c) || j === line.length - 1) {
				if (n > 0 && !!zone) {
					numbers.push({ n, zone: zone.char ? zone : undefined })
				}
				n = 0;
				zone = undefined;
			}

		})
	});
	return numbers;
}

const matrix = buildMatrix(arr);
const zones = buildZones(matrix);
const numbers = groupNumbersWithZones(matrix, zones);

const result1 = numbers.filter(n => !!n.zone).reduce((r, item) => r + item.n, 0);

const numbers2 = numbers.filter(n => n.zone?.char === '*').map(n => ({ id: n.zone.y * 10000 + n.zone.x, n: n.n }));
const numbers2Grouped = numbers2.reduce((r, n) => {
	r[n.id] = r[n.id] || { numbers: [] };
	r[n.id].numbers.push(n.n);
	return r;
}, {});

const result2 = Object.keys(numbers2Grouped).reduce((r, key) => {
	if (numbers2Grouped[key].numbers.length !== 2) return r;
	r = r + numbers2Grouped[key].numbers[0] * numbers2Grouped[key].numbers[1];
	return r;
}, 0);

console.log('pt1:', result1);
console.log('pt2:', result2);
