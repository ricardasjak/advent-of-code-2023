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

// console.log(entries);

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
		// const filtered = map.filter(e => e.source <= next);
		// console.log(map.length, filtered.length);

		for (let i = 0; i < map.length; i++) {
			// if (map[i].source + map[i].range <= next) {
			// 	continue;
			// }
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

console.time();

console.log('---------');
console.log('pt1:', result1);
const flag = true;

if (flag) {
	// const seeds2 = [];
	const travel2 = [];
	let MIN_DESTINATION = 999999999999999;
	let counter = 0;
	for (let i = 0; i < seeds.length; i++) {

		if (i % 2 === 0) {
			let start = seeds[i];
			console.log('seeds2 count:', seeds[i + 1].toLocaleString(), 'from', start.toLocaleString());
			counter += seeds[i + 1];
			console.time('seed set travel');
			for (let j = 0; j < seeds[i + 1]; j++) {
				// travel2.push(seedTravel(start + j, SETS));
				const dest = seedTravel(start + j, SETS);
				MIN_DESTINATION = Math.min(MIN_DESTINATION, dest);
			}
			console.timeEnd('seed set travel');
			console.log('from', start.toLocaleString(), 'min:', MIN_DESTINATION.toLocaleString());
		}
	}
	// console.log('seeds 2 count', seeds2.length);
	// const travel2 = seeds2.map(seed => seedTravel(seed, entries));
	const result2 = MIN_DESTINATION;//travel2.reduce((r, n) => Math.min(r, n), 999999999999);
	console.log('pt2:', result2);
}
console.timeEnd();

// answer: 6472060
