'use strict';

const assert = require('assert');

const input = require('./input');

function parseInput(data) {
    return data.map((row) => {
        const [prog, children] = row.split(' -> ');
        let childArr;
        if (children) {
            childArr = children.split(', ');
        }

        let [progName, weight] = prog.split(' ');

        weight = /(\d+)/g.exec(weight)[0];

        return {
            name: progName,
            weight,
            children: childArr
        };
    });
}

function getRoot(data) {
    const programData = parseInput(data);

    const parents = new Set();
    const children = new Set();

    programData.forEach((program) => {
        if (program.children) {
            parents.add(program.name);

            program.children.forEach((child) => {
                children.add(child);
            });
        }
    });

    const root = new Set([...parents].filter((parent) => !children.has(parent)));
    assert([...root].length === 1);

    return [...root][0];
}


const testInput = [
    'pbga (66)',
    'xhth (57)',
    'ebii (61)',
    'havc (66)',
    'ktlj (57)',
    'fwft (72) -> ktlj, cntj, xhth',
    'qoyq (66)',
    'padx (45) -> pbga, havc, qoyq',
    'tknk (41) -> ugml, padx, fwft',
    'jptl (61)',
    'ugml (68) -> gyxo, ebii, jptl',
    'gyxo (61)',
    'cntj (57)',
];

assert.equal(getRoot(testInput), 'tknk')

console.log(getRoot(input));
