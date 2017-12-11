'use strict';

const input = require('./input');
const steps = input.split(',');

let x = 0;
let y = 0;
let z = 0;

const maxDist = steps.reduce((acc, step) => {
    switch (step) {
        case 'n':
            y++;
            z--;
            break;
        case 'ne':
            x++;
            z--;
            break;
        case 'se':
            x++;
            y--;
            break;
        case 's':
            z++;
            y--;
            break;
        case 'sw':
            z++;
            x--;
            break;
        case 'nw':
            y++;
            x--;
            break;
        default:
            throw new Error(`that's not a direction!: ${step}`);
    }

    return Math.max(...[x, y, z].map(Math.abs), acc);
}, 0);

console.log(maxDist);
