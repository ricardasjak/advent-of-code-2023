// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

type Race = {
	time: number;
	distance: number;
}

const parseRaces = (lines: string[]): Race[] => {
	const times = lines[0].split(':')[1].trim().split(' ').map(Number).filter(Boolean);
	const distances = lines[1].split(':')[1].trim().split(' ').map(Number).filter(Boolean);
	return times.reduce((result, time, index) => {
		result.push({ time, distance: distances[index] });
		return result;
	}, [] as Array<Race>);
}

const findWinsCount = ({ time, distance }: Race): number => {
	const half = Math.ceil(time / 2);
	let t = half;
	let d = t * (time - t);
	let result = 0;
	while (d > distance) {
		console.log(JSON.stringify({ time, t, d }));
		result += 1;
		t += 1;
		d = t * (time - t);
	}
	result = half === time / 2 ? result * 2 - 1 : result * 2;
	return result;
}

const solvePart1 = (input: string[]): number => {
	const races = parseRaces(input);
	return races.reduce((acc, r) => acc * findWinsCount(r), 1);
}

console.time();
console.log('pt1:', solvePart1(arr));
console.log('pt2:', 0);
console.timeEnd();

// answer pt2: 6472060
