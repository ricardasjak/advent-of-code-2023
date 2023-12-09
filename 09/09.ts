// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();

console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

const parse = (lines: string[]): Array<Array<number>> => {
	const result = lines.map(s => s.split(' ').map(Number));
	return result;
}

const nextSequence = (sequence: number[], result: number[][]): number[][] => {
	const r = sequence.map((n, i) => sequence[i + 1] - n);
	r.pop();
	result.push(r);
	const lastSeq = result[result.length - 1];
	if (lastSeq[lastSeq.length - 1] === 0) {
		return result;
	} else {
		return nextSequence(r, result);
	}
}

const findNext = (triangle: number[][]): number => {
	return triangle.reduce((acc, seq) => {
		return acc + seq[seq.length - 1];
	}, 0);
}


const solvePart1 = (input: string[]): number => {
	const data = parse(input);

	const sum = data.reduce((acc, sequence) => {
		const triangle = nextSequence(sequence, [[...sequence]]);
		const next = findNext(triangle);
		return acc + next;
	}, 0);
	return sum;
}

const solvePart2 = (input: string[]): number => {
	return 0;
}


console.time();
console.log('pt1:', solvePart1(arr));
console.log('pt2:', solvePart2(arr));
console.timeEnd();
