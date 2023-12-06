// @ts-ignore
const file = Bun.file("input.txt");
// @ts-ignore
const input = await file.text();
console.clear();
console.log('---------');

let arr = input.toLowerCase().split('\n') as string[];
arr = arr.filter(Boolean);

console.time();
console.log('pt1:', 0);
console.log('pt2:', 0);
console.timeEnd();

// answer pt2: 6472060
