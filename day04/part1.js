'use strict';

const assert = require('assert');
const input = require('./input');

function isValidPassphrase(passphrase) {
    const words = {};
    
    passphrase.split(' ').forEach((word) => {
        if (!words[word]) {
            words[word] = 0;
        }

        words[word]++;
    });

    const wordCounts = Object.keys(words).map((word) => words[word]);

    return wordCounts.every((count) => count === 1);
}

function getNumValidPassphrases(passphrases) {
    return passphrases.map(isValidPassphrase)
        .reduce((acc, val) => val ? ++acc : acc, 0)
}


assert.equal(isValidPassphrase('aa bb cc dd ee'), true);
assert.equal(isValidPassphrase('aa bb cc dd aa'), false);
assert.equal(isValidPassphrase('aa bb cc dd aaa'), true);

console.log(getNumValidPassphrases(input));