// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();

console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

const parse = (lines: string[]): any[] => {
	return [];
}

const solvePart1 = (input: string[]): number => {
	return 0;
}

const solvePart2 = (input: string[]): number => {
	return 0;
}

console.time();
console.log('pt1:', solvePart1(arr));
console.timeEnd();

console.time();
console.log('pt2:', solvePart2(arr));
console.timeEnd();
