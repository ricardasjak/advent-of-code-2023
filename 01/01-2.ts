// @ts-ignore
const file = Bun.file("01.txt");
// @ts-ignore
const input = await file.text();
const debug = false;

console.clear();
const numberStr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const lastNumberStr = numberStr.map(s => s.split('').reverse().join(''));
console.log(lastNumberStr);

let arr = input.toLowerCase().split('\n') as string[];
if (debug) {
	arr = ['two1nine',
		'eightwothree',
		'abcone2threexyz',
		'xtwone3four',
		'4nineeightseven2',
		'zoneight234',
		'7pqrstsixteen', 'twonetwone', 'eightnineseventwo1sevenine', ...arr];
	arr = arr.slice(0, 10);
} else {
	console.debug = () => null;
}


const result = arr
	.reduce((r, ss) => {
		let s = ss;

		let firstIndex = 999;
		let firstNumber = '';
		numberStr.forEach((ns, no) => {
			const i = s.indexOf(ns);
			if (i > -1 && i < firstIndex) {
				firstIndex = i;
				firstNumber = ns;
			}
		});
		if (firstNumber) {
			s = s.replace(firstNumber, numberStr.indexOf(firstNumber).toString());
		}

		console.log(ss, {s})
		let lastIndex = 999;
		let lastNumber = '';
		let reversed = s.split('').reverse().join('');
		// numberStr.forEach((ns, no) => {
		// 	const i = s.lastIndexOf(ns);
		// 	if (i > -1 && i < lastIndex) {
		// 		lastIndex = i;
		// 		lastNumber = ns;
		// 		//s = s.split(lastNumber).join(numberStr.indexOf(lastNumber).toString());
		// 	}
		// });
		// if (lastNumber) {
		// 	//s = s.replace(lastNumber, numberStr.indexOf(lastNumber).toString());
		// 	s = s.split(lastNumber).join(numberStr.indexOf(lastNumber).toString());
		// }


		lastNumberStr.forEach((ns, no) => {
			const i = reversed.indexOf(ns);
			// console.debug('*********',reverse,ns, i);
			if (i > -1 && i < lastIndex) {
				lastIndex = i;
				lastNumber = ns;//.split('').reverse().join('');
			}
		});
		if (lastNumber) {
			//s = s.replace(lastNumber, numberStr.indexOf(lastNumber).toString());
			reversed = reversed.replace(lastNumber, lastNumberStr.indexOf(lastNumber).toString());
		}
		s = reversed.split('').reverse().join('');

		// console.debug('****',firstNumber, lastNumber, s)


		const chars = s.split('')
			.map(char => char >= 'a' ? '' : char);

		const digits = chars
			.filter(c => c != '')
			.map(Number);

		const first = digits[0] || 0;
		const last = digits[digits.length - 1] || 0;
		const n: number = digits.length <= 1 ? first * 10 + first : first * 10 + last;

		// console.debug(ss, digits, n, s);
		console.log(n);
		return r + n;
	}, 0);


console.log(result)
// 51345 too low
// 54095 too high
