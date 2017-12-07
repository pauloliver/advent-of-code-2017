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

        weight = parseInt(/(\d+)/g.exec(weight)[0], 10);

        return {
            name: progName,
            weight,
            children: childArr
        };
    });
}

function getRoot(programData) {
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


function getWeight(node) {
    if (!node.children) {
        return node.weight;
    }

    const childNodes = node.children.map((childName) => {
        return map.get(childName);
    });

    const childWeights = childNodes.map((childNode) => {
        return getWeight(childNode);
    });

    const sampleWeight = childWeights[0];
    if (!childWeights.every((childWeight) => childWeight === sampleWeight)) {
        console.log({node, childNodes, childWeights});
    }

    return node.weight + childWeights.reduce((acc, val) => acc + val, 0);
}

const parsed = parseInput(input);
const root = getRoot(parsed);
const map = new Map();

parsed.forEach((row) => {
    map.set(row.name, row);
});

getWeight(map.get(root));
