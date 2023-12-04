// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

const cardPoints = arr.reduce((cards, s, index) => {
	const [p1, p2] = s.split(':');
	const [left, right] = p2.split('|').map(item => item.trim());
	const winningNumbers: number[] = left.split(' ').filter(c => c !== '').map(Number);
	const yourNumbers: number[] = right.split(' ').filter(c => c !== '').map(Number);

	const goodNumbers: number[] = winningNumbers.filter(n => yourNumbers.indexOf(n) > -1);
	cards[index + 1] = goodNumbers.length;

	return cards;
}, {});

const cards = {};
arr.forEach((_, i) => {
	const index = i + 1;
	cards[index] = cards[index] || 1;
	const points = cardPoints[index];
	for (let j = 1; j <= points; j++) {
		const copyNo = index + j;
		const copiesCount = cards[index] || 1;
		if (copyNo <= Object.keys(cardPoints).length) {
			cards[copyNo] = cards[copyNo] || 1;
			cards[copyNo] = cards[copyNo] + copiesCount;
		}
	}
});

const result1 = Object.keys(cardPoints).reduce(
	(sum, c) => sum = sum + (cardPoints[c] > 0 ? Math.pow(2, cardPoints[c] - 1) : 0), 0);
const result2 = Object.keys(cards).reduce((sum, c) => sum + cards[c], 0);

console.log('pt1:', result1);
console.log('pt2:', result2);
