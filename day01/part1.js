const input = require('./input');
const digits = input.split('');

digits.push(digits[0]);

let sum = 0;

for (let i = 0; i < digits.length - 1; i++) {
    const current = digits[i];

    if (current === digits[i+1]) {
        sum += parseInt(current, 10);
    }
}

console.log(sum);