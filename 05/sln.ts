// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

type Entry = {
	dest: number;
	source: number;
	range: number;
}

const [seedsStr, ...rest] = arr;
const parseEntries = (lines): Record<string, Entry[]> => {
	const result: Record<string, Entry[]> = {};
	let cat = '';
	lines.forEach((s, i) => {
		if (s.indexOf('map') > -1) {
			cat = s.split(' ')[0];
			result[cat] = [];
		} else {
			const [dest, source, range] = s.split(' ').map(Number);
			result[cat].push({ dest, source, range });
		}
	});
	return result;
}

const entries = parseEntries(rest);
const seeds = seedsStr.split(':')[1].split(' ').filter(Boolean).map(Number);

const findSeedDestination = (pos: number, { dest, source, range }: Entry): number => {
	let result = -1;
	if (source <= pos && pos < (source + range)) {
		result = dest + (pos - source);
	}
	return result;
}

const seedTravel = (seed: number, entries: Record<string, Entry[]>): number => {
	const maps = Object.keys(entries).map(key => entries[key]);

	let pos = seed;
	let next = pos;
	maps.forEach((map, index) => {
		const original = next;
		next = map.reduce((r, entry) => {
			const d = findSeedDestination(next, entry);
			// console.log({ next, d, r });
			return d > -1 ? d : r;
		}, -1);
		if (next < 0) {
			next = original;
		}
		// console.log('next', next, index + 1);
	});
	return next
}

const travel = seeds.map(seed => seedTravel(seed, entries));
const result1 = Math.min(...travel);

console.log('---------');
console.log('pt1:', result1);
console.log('pt2:', 0);


