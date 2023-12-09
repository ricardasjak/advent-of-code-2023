// @ts-ignore
const file = Bun.file("input-mini.txt");
// @ts-ignore
const input = await file.text();

console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

type NodeX = {
	top: string;
	type?: 'a' | 'z';
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
		const top = p1.trim();
		const type = top.split('')[2] as 'a' | 'z';
		return {
			top,
			type,
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
	if (steps > 100_000_000) return steps;
	return travel(dic, path, steps + 1, node[direction]);
}

const travel2 = (dic: Record<string, NodeX>, path: Direction[], steps: number, nextSet: string[]): number => {
	const direction = path[steps % path.length];
	const newNextSet = nextSet.map((next => {
		const node = dic[next][direction];
		return node;
	}));

	if (steps > 1_000_000) return steps;
	if (newNextSet.some( set => dic[set].type !== 'z')) {
		return travel2(dic, path, steps + 1, newNextSet);
	} else {
		return steps + 1;
	}
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
	const path = parsePath(input);
	const nodes = parse(input);
	const dic = nodes.reduce((acc, {top, l, r, type }) => {
		acc[top] = { r, l, top, type };
		return acc;
	}, {});

	const startingNodes = nodes.filter(n => n.type === 'a').map(n => n.top);
	const steps = travel2(dic, path, 0, [...startingNodes]);
	return steps;
}

console.time();
// console.log('pt1:', solvePart1(arr));
console.log('pt2:', solvePart2(arr));
console.timeEnd();


// 1000_000_000_000 - too low
