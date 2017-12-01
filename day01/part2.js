const input = require('./input');
const digits = input.split('').map(d => parseInt(d, 10));

let sum = 0;
const length = digits.length;
const halfLength = length / 2;

for (let i = 0; i < digits.length; i++) {
    const current = digits[i];

    const oppositeIdx = i >= halfLength ? i - halfLength : i + halfLength
    const oppositeVal = digits[oppositeIdx];

    if (current === oppositeVal) {
        sum += current;
    }
}

console.log(sum);