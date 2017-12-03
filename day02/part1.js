'use strict';

const assert  = require('assert');
const input = require('./input');

const testCase = [
  '5 1 9 5',
  '7 5 3',
  '2 4 6 8'
];

const TEST_CASE_RESULT = 18;

function calculateChecksum(table) {
  return table.map((row) => row.split(' ').map((number) => parseInt(number, 10)))
    .map((row) => {
      return row.reduce((acc, val) => {
        const { max, min } = acc;

        if (val > max) {
          acc.max = val;
        }

        if (val < min) {
          acc.min = val;
        }

        return acc;
      }, {
        max: Number.MIN_VALUE, 
        min: Number.MAX_VALUE
      });
    }).reduce((acc, val) => {
      const difference = val.max - val.min;

      return acc + difference;
  }, 0);  
}

assert.equal(calculateChecksum(testCase), TEST_CASE_RESULT);

console.log(calculateChecksum(input));