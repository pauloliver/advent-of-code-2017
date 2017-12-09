'use strict';

const assert = require('assert');

const input = require('./input');

const testInput = [
    'b inc 5 if a > 1',
    'a inc 1 if b < 5',
    'c dec -10 if a >= 1',
    'c inc -20 if c == 10'
];



function getMemoryValue(memory, location) {
    const val = memory.get(location);
    return val || 0;
}

function testMemory(conditionLocation, condition, conditionTest, memory) {
    const value = getMemoryValue(memory, conditionLocation);
    return eval(`${value} ${condition} ${conditionTest}`);
}

function handleInstruction(instruction, memory) {
    const [location, command, amount, _, conditionLocation, condition, conditionTest] = instruction.split(' ');
    
    if (testMemory(conditionLocation, condition, conditionTest, memory)) {
        const memVal = memory.get(location) || 0;
        const modifyAmount = parseInt(amount, 10) * (command === 'dec' ? -1 : 1);
        memory.set(location, (memVal + modifyAmount));
    }
}

const memory = new Map();
input.forEach((row) => {
    handleInstruction(row, memory);
});

console.log(memory);

const maxVal = [...memory.values()].reduce((acc, val) => {
    return val > acc ? val : acc;
}, Number.MIN_VALUE);

console.log(maxVal);
