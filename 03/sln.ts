// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
const debug = true;
console.clear();
console.log('---------');
const DOT = '.';

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);
if (debug) {
	// arr = ['nine4pvtl','twonetwone', 'eightnineseventwo1sevenine', ...arr];
	// arr = arr.splice(0, 5);
} else {
	console.debug = () => null;
}
type Matrix = Array<Array<string>>;

const isDigit = (c: string) => c >= '0' && c <= '9';
const isSymbol = (c: string) => !isDigit(c) && c !== DOT;
const exists = (matrix: Matrix, y, x): boolean => {
	return !(typeof matrix[y] === 'undefined' || typeof matrix[y][x] === 'undefined');
}
type P1 = {
	char: ''
}

const buildMatrix = (arr: string[]): Matrix => {
	return arr.reduce((r, s) => {
		r.push(s.split(''));
		return r;
	}, []);
}


const buildZones = (m: Matrix): Array<Array<string>> => {
	const zones: Array<Array<string>> = m.map(line => line.map(c => ''));
	m.forEach((line, i) => {
		line.forEach((c, j) => {
			if (isSymbol(c)) {
				zones[i][j] = c;
				for (let y = -1; y <= 1; y++) {
					for(let x = -1; x <= 1; x++) {
						if (exists(m, i + y, j + x)) {
							if (zones[i + y][j + x] !== '*') {
								zones[i + y][j + x] = c;
							}
						}
					}
				}
			}
		})
	});
	return zones;
}
// const buildZonesPt2 = (m: Matrix): Array<Array<boolean>> => {
// 	const zones: Array<Array<boolean>> = m.map(line => line.map(c => false));
// 	m.forEach((line, i) => {
// 		line.forEach((c, j) => {
// 			if (c === '*') {
// 				zones[i][j] = true;
// 			}
// 			if (c === '*') {
// 				zones[i][j] = true;
// 				for (let y = -1; y <= 1; y++) {
// 					for(let x = -1; x <= 1; x++) {
// 						if (exists(m, i + y, j + x)) {
// 							zones[i + y][j + x] = true;
// 						}
// 					}
// 				}
// 			}
// 		})
// 	});
// 	return zones;
// }

const sumNumbersInZones = (m: Matrix) => {
	let numbers = [];
	m.forEach((line, i) => {
		let n = 0;
		let inZone = false;
		let symbol = '';
		line.forEach((c, j) => {
			if (isDigit(c)) {
				n = n * 10 + Number(c);
				inZone = inZone || !!zones1[i][j];
				symbol = symbol === '*' ? '*' : zones1[i][j];
			}
			// not digit or last
			if (!isDigit(c) || j === line.length - 1) {
				if (n > 0 && inZone) {
					// console.log(n);
					numbers.push({n, symbol})
				}
				n = 0;
				symbol = '';
				inZone = false;
			}

		})
	});
	return numbers;
}

const sumNumbersInZonesPt2 = (m: Matrix) => {
	let sum = 0;
	m.forEach((line, i) => {
		let n = 0;
		let inZone = false;
		line.forEach((c, j) => {
			// if (c === '*') {
			// 	n = n * 10 + Number(c);
			// 	inZone = inZone || zones1[i][j];
			// }

			// not digit or last
			// if (!isDigit(c) || j === line.length - 1) {
			// 	if (n > 0 && inZone) {
			// 		// console.log(n);
			// 		sum += n;
			// 	}
			// 	n = 0;
			// 	inZone = false;
			// }

		})
	});
	return sum;
}

const matrix = buildMatrix(arr);
const zones1 = buildZones(matrix);
const result1 = sumNumbersInZones(matrix).reduce((r, item) => r + item.n, 0);
const result2 = sumNumbersInZonesPt2(matrix);

console.log(zones1.join('\n'));
console.log('pt1:', result1);
console.log('pt2:', result2);


