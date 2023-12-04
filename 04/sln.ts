// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

const result = arr.reduce((sum, s) => {
	const [p1, p2] = s.split(':');
	const [ left, right ] = p2.split('|').map(item => item.trim());
	const winningNumbers: number[] = left.split(' ').filter(c => c !== '').map(Number);
	const yourNumbers: number[] = right.split(' ').filter(c => c !== '').map(Number);

	const goodNumbers: number[] = winningNumbers.filter(n => yourNumbers.indexOf(n) > -1);
	const points = goodNumbers.length > 0 ? Math.pow(2, goodNumbers.length - 1) : 0;
	return sum + points;
}, 0);

console.log('pt1:', result);
