'use strict';

const assert  = require('assert');
const input = require('./input');

const testCase = [
  '5 9 2 8',
  '9 4 7 3',
  '3 8 6 5'
];

const TEST_CASE_RESULT = 9;

function divide(a, b) {
  const big = Math.max(a, b);
  const small = Math.min(a, b);

  return big / small;
}

function isDivisible(a, b) {
  return Number.isInteger(divide(a, b));
}

function calculateChecksum(table) {
  const rows = table.map((row) => row.split(' ').map((number) => parseInt(number, 10)));
  let total = 0;

  return rows.map((row, rowIdx) => {
    for (let i = 0; i < row.length; i++) {
      for(let j = 0; j < row.length; j++) {
        if (i !== j && rows[i] !== rows[j]) {
          const a = row[i];
          const b = row[j];

          if (isDivisible(a, b)) {
            return divide(a, b);
          }
        }
      }
    }
  }).reduce((acc, val) => acc + val, 0);
}


assert.equal(calculateChecksum(testCase), TEST_CASE_RESULT);

console.log(calculateChecksum(input));