'use strict';

const assert = require('assert');

const input = [4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5];


function getLargestBankIdx(banks) {
    const { idx } = banks.reduce((acc, val, idx) => {
        if (val > acc.largest) {
            acc = { idx, largest: val }
        }

        return acc;
    }, {idx: null, largest: Number.MIN_VALUE});

    return idx;
}

function distributeBlocks(banks) {
    const largestBankIdx = getLargestBankIdx(banks);
    const numBlocks = banks[largestBankIdx];

    banks[largestBankIdx] = 0;
    
    let bankIdx = (largestBankIdx + 1) % banks.length;

    for (let i = 0; i < numBlocks; i++) {
        banks[bankIdx]++;
        bankIdx = (bankIdx + 1) % banks.length;
    }

    return banks;
}

function getBankState(banks) {
    return banks.join(',');
}

function findNumCycles(banks) {
    const seenCombos = new Map();
    let comboSeen = false;
    let numCycles = 0;

    while (true) {
        const bankState = getBankState(banks);

        if (seenCombos.has(bankState)) {
            return numCycles - seenCombos.get(bankState);
        }

        seenCombos.set(bankState, numCycles); 

        numCycles++;
        
        banks = distributeBlocks(banks);
    }
}

assert.equal(findNumCycles([0, 2, 7, 0]), 4);

console.log(findNumCycles(input));
