// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();

console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

type NodeX = {
	top: string;
	l: string;
	r: string;
}

type Direction = 'l' | 'r';

type NodeY = {
	l: string;
	r: string;
}

const parse = (lines: string[]): NodeX[] => {
	const [path, ...rest] = lines;
	return rest.map(s => {
		const [p1, p2] = s.split('=');
		const [l, r] = p2.replace('(', '').replace(')', '').split(', ').map(s => s.trim());
		return {
			top: p1.trim(),
			l,
			r
		}
	})
};

const parsePath = (lines: string[])=> {
	const [path] = lines;
	return path.split('') as Direction[];
};

const travel = (dic: Record<string, NodeY>, path: Direction[], steps: number, next: string): number => {
	const direction = path[steps % path.length];
	const node = dic[next];

	// console.log(`${steps} ${next} ${direction} ${JSON.stringify(node)}`)
	if (next === 'zzz') {
		return steps;
	}
	if (!node) {
		console.log('node not found', { next, steps, direction });
		return steps;
	}
	if (steps > 1_000_000) return steps;
	return travel(dic, path, steps + 1, node[direction]);
}

const solvePart1 = (input: string[]): number => {
	const path = parsePath(input);
	const dic = parse(input).reduce((acc, {top, l, r }) => {
		acc[top] = { r, l };
		return acc;
	}, {});

	const steps = travel(dic, path, 0, 'aaa');

	// console.log(path);
	// console.log(dic);
	return steps;
}

const solvePart2 = (input: string[]): number => {
	return 0;
}

console.time();
console.log('pt1:', solvePart1(arr));
console.log('pt2:', solvePart2(arr));
console.timeEnd();
