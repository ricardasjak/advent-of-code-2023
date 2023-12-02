// @ts-ignore
const file = Bun.file("01.txt");
// @ts-ignore
const input = await file.text();
const debug = false;

console.clear();
const numberStr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const lastNumberStr = numberStr.map(s => s.split('').reverse().join(''));

let arr = input.toLowerCase().split('\n') as string[];
if (debug) {
	arr = ['nine4pvtl','twonetwone', 'eightnineseventwo1sevenine', ...arr];
	arr = arr.splice(0, 5);
} else {
	console.debug = () => null;
}

const result = arr
	.reduce((r, s) => {
		const chars = s.split('')
			.map(char => char >= 'a' ? '' : char);

		const digits = chars
			.filter(c => c != '')
			.map(Number);

		const first = digits[0] || 0;
		const last = digits[digits.length - 1] || 0;
		const n: number = digits.length <= 1 ? first * 10 + first : first * 10 + last;

		if (n < 10 || first === 0) console.log(s, first, last);
		return r + n;
	}, 0);

console.log(result)
