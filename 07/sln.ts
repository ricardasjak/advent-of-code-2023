// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();


console.clear();
console.log('---------');

let arr = input.toUpperCase().split('\n') as string[];
arr = arr.filter(Boolean);


type Cards = {
	hand: string[],
	amount: number,
	weight: number;
}

const ORDER = 'AKQJT98765432'.split('').reverse();
const ORDER2 = 'AKQT98765432J'.split('').reverse();
const JOKER = 'J';

const parse = (lines: string[]): Cards[] => {
	return lines.map(s => {
		const [handStr, amountStr] = s.split(' ');
		return ({
			hand: handStr.split(''),
			amount: Number(amountStr),
			weight: 0,
		})
	})
}

const compareHighestCard = (hand1: string[], hand2: string[], order: string[]) => {
	for (let i = 0; i < hand1.length; i++) {
		if (hand1[i] === hand2[i]) continue;
		else {
			return (order.indexOf(hand1[i]) - order.indexOf(hand2[i]));
		}
	}
	return 0;
}

const solvePart1 = (input: string[]) => {
	const cards = parse(input);

	cards.map(c => {
		// @ts-ignore
		const n = Array.from(new Set(c.hand)).length;
		const dic = c.hand.reduce((acc, s) => {
			acc[s] = acc[s] || 0;
			acc[s] += 1;
			acc.first = Math.max(acc[s], acc.first);
			return acc;
		}, { first: 0 });

		let weight = 0;
		switch (n) {
		case 5:
			weight = 10;
			break
		case 4:
			weight = 100;
			break
		case 3:
			weight = dic.first === 3 ? 10_000 : 1_000;
			break
		case 2:
			weight = dic.first === 4 ? 1000_000 : 100_000;
			break;
		case 1:
			weight = 10_000_000;
			break;
		}
		c.weight = weight;
	});

	let result = cards.sort((a, b) => a.weight - b.weight || compareHighestCard(a.hand, b.hand, ORDER));
	return result.reduce((acc, card, i) => {
		// console.log(i + 1, card.amount, card.hand);
		return acc + card.amount * (i + 1);
	}, 0);
}


const solvePart2 = (input: string[]) => {
	const cards = parse(input);

	cards.map(c => {
		// @ts-ignore
		const n = Array.from(new Set(c.hand.filter(s => s !== JOKER))).length;
		const dic = c.hand.reduce((acc, s) => {
			acc[s] = acc[s] || 0;
			acc[s] += 1;
			acc.first = s !== JOKER ? Math.max(acc[s], acc.first) : acc.first;
			return acc;
		}, { first: 0 });

		dic.first += (dic[JOKER] || 0);

		let weight = 0;
		switch (n) {
		case 5:
			weight = 10;
			break
		case 4:
			weight = 100;
			break
		case 3:
			weight = dic.first === 3 ? 10_000 : 1_000;
			break
		case 2:
			weight = dic.first === 4 ? 1000_000 : 100_000;
			break;
		case 0:
		case 1:
			weight = 10_000_000;
			break;
		}
		c.weight = weight;
	});

	let result = cards.sort((a, b) => a.weight - b.weight || compareHighestCard(a.hand, b.hand, ORDER2));
	return result.reduce((acc, card, i) => {
		return acc + card.amount * (i + 1);
	}, 0);
}

console.time();
console.log('pt1:', solvePart1(arr));
console.log('pt2:', solvePart2(arr));
console.timeEnd();
