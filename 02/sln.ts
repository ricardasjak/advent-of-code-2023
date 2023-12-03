// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
const debug = true;
console.clear();

let arr = input.toLowerCase().split('\n') as string[];
if (debug) {
	// arr = ['nine4pvtl','twonetwone', 'eightnineseventwo1sevenine', ...arr];
	// arr = arr.splice(0, 5);
} else {
	console.debug = () => null;
}


const parseGameNumber = (s: string): number => {
	const [_, nstr] = s.split('game');
	return parseInt(nstr.trim());
}

const result1 = arr.filter(Boolean)
	.reduce((result, s) => {
		return result + 1
	}, 0);

console.log(result1)

