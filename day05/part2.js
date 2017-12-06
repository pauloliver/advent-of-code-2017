'use strict';

const assert = require('assert');
const input = require('./input');

function calculateOffset(instructions) {
    let currentIdx = 0;
    let numSteps = 0;

    while (currentIdx < instructions.length && currentIdx >= 0) {
        let instruction = instructions[currentIdx];

        instructions[currentIdx] += ((instructions[currentIdx] >=3) ? -1 : 1);
        currentIdx = currentIdx + instruction;
        numSteps++;
    }

    return numSteps;
}

assert.equal(calculateOffset([0, 3, 0, 1, -3]), 10);

console.log(calculateOffset(input));