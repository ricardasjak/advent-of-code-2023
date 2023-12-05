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

const maps = Object.keys(entries).map(key => entries[key]);
maps.forEach(map => {
	map.sort((a, b) => a.source - b.source);
});

const findSeedDestination = (pos: number, { dest, source, range }: Entry): number => {
	let result = -1;
	if (source <= pos && pos < (source + range)) {
		result = dest + (pos - source);
	}
	return result;
}

const SETS = Object.keys(entries).map(key => entries[key]);
const seedTravel = (seed: number, sets: Array<Array<Entry>>): number => {
	let next = seed;
	sets.forEach((map) => {
		const original = next;
		for (let i = 0; i < map.length; i++) {
			const d = findSeedDestination(next, map[i]);
			if (d > -1) {
				next = d;
				break;
			}
			if (map[i].source > next) break;
		}
	});
	return next
}

const travel1 = seeds.map(seed => seedTravel(seed, SETS));
const result1 = Math.min(...travel1);

console.log('---------');
console.log('pt1:', result1);

console.time('part 2');
let MIN_DESTINATION = 999999999999999;
let counter = 0;
const rangedSeeds = [];
for (let i = 0; i < seeds.length; i = i + 2) {
	rangedSeeds.push([seeds[i], seeds[i + 1]])
}
rangedSeeds.sort((a, b) => a[1] - b[1]);
for (let i = 0; i < rangedSeeds.length; i++) {
	let [start, range] = rangedSeeds[i];
	counter += range;
	console.time('seeds travel time in range');
	for (let j = 0; j < range; j++) {
		const dest = seedTravel(start + j, SETS);
		MIN_DESTINATION = Math.min(MIN_DESTINATION, dest);
	}
	console.timeEnd('seeds travel time in range');
	console.log(i + 1, 'seeds from', start.toLocaleString(), ' range:', range.toLocaleString(), 'answer:', MIN_DESTINATION.toLocaleString());
}
const result2 = MIN_DESTINATION;
console.log('pt2:', result2);
console.log('seeds total count: ', counter);

console.timeEnd('part 2');

// answer pt2: 6472060
