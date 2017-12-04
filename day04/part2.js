'use strict';

const assert = require('assert');
const input = require('./input');

function sortWord(word) {
    return word
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('');
}

function isValidPassphrase(passphrase) {
    const words = {};
    
    passphrase
        .split(' ')
        .map(sortWord)
        .forEach((word) => {
            if (!words[word]) {
                words[word] = 0;
            }

            words[word]++;
        });

    const wordCounts = Object.keys(words).map((word) => words[word]);

    return wordCounts.every(count => count === 1);
}

function getNumValidPassphrases(passphrases) {
    return passphrases.map(isValidPassphrase)
        .reduce((acc, val) => val ? ++acc : acc, 0)
}


assert.equal(isValidPassphrase('abcde fghij'), true);
assert.equal(isValidPassphrase('abcde xyz ecdab'), false);
assert.equal(isValidPassphrase('a ab abc abd abf abj'), true);
assert.equal(isValidPassphrase('iiii oiii ooii oooi oooo'), true);
assert.equal(isValidPassphrase('oiii ioii iioi iiio'), false);


console.log(getNumValidPassphrases(input));
