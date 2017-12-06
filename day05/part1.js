'use strict';

const assert = require('assert');
const input = require('./input');

function calculateOffset(instructions) {
    let currentIdx = 0;
    let numSteps = 0;

    while (currentIdx < instructions.length && currentIdx >= 0) {
        let instruction = instructions[currentIdx];

        instructions[currentIdx]++;
        currentIdx = currentIdx + instruction;
        
        numSteps++;
    }

    return numSteps;
}


/*  (0) 3  0  1  -3  - before we have taken any steps.
    (1) 3  0  1  -3  - jump with offset 0 (that is, don't jump at all). Fortunately, the instruction is then incremented to 1.
     2 (3) 0  1  -3  - step forward because of the instruction we just modified. The first instruction is incremented again, now to 2.
     2  4  0  1 (-3) - jump all the way to the end; leave a 4 behind.
     2 (4) 0  1  -2  - go back to where we just were; increment -3 to -2.
     2  5  0  1  -2  - jump 4 steps forward, escaping the maze.
*/

assert.equal(calculateOffset([0, 3, 0, 1, -3]), 5);

console.log(calculateOffset(input));