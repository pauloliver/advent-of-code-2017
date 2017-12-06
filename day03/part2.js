'use strict';

const input = 368078;

class Spiral {
    constructor() {
        this._values = {};
        this._values[0] = {};
        this._values[0][0] = 1;
    }

    get(x, y) {
        return (this._values[x] && this._values[x][y]);
    }

    set(x, y, val) {
        if (!this._values[x]) {
            this._values[x] = {};
        }

        this._values[x][y] = val;
    }
}

function calculateSpiralValue(spiral = new Spiral(), x = 0, y = 0) {
    // is it still vanilla nodeJS if I used R.xprod to generate this? :P
    const moves = [
        [-1, -1], 
        [-1, 0], 
        [-1, 1], 
        [0, -1], 
        [0, 1], 
        [1, -1], 
        [1, 0], 
        [1, 1]
    ];

    return moves.reduce((acc, val) => {
        const [xOffset, yOffset] = val;       
        const spiralVal = spiral.get(x + xOffset, y + yOffset);

        return spiralVal ? acc + spiralVal : acc;
    }, 0);
}

function spiralize(maxVal) {
    const spiral = new Spiral();

    let val = 1;

    let x = 1;
    let y = 0;
    let currentRingSize = 3;
    let currentDirection = 'up';

    let corners = {
        bottomRight: {x: 1,  y: -1},
        topRight: {x: 1,  y: 1},
        topLeft: {x: -1,  y: 1},
        bottomLeft: {x: -1,  y: -1}
    }

    while (val < maxVal) {
        const newVal = calculateSpiralValue(spiral, x, y);
        spiral.set(x, y, newVal);
        val = newVal;

        switch (currentDirection) {
            case 'up': {
                y++;

                if (x === corners.topRight.x && y === corners.topRight.y) {
                    currentDirection = 'left';
                }
                break;
            }
            case 'left': {
                x--;

                if (x === corners.topLeft.x && y === corners.topLeft.y) {
                    currentDirection = 'down';
                }
                break;
            }
            case 'down': {
                y--;

                if (x === corners.bottomLeft.x && y === corners.bottomLeft.y) {
                    currentDirection = 'right';
                }
                break;
            }
            case 'right': {
                x++;

                // bottom right is the "exit corner",
                // and gets one extra right move before turning directions
                if (x === corners.bottomRight.x + 1 && y === corners.bottomRight.y) {
                    currentRingSize += 2;
                    currentDirection = 'up';

                    const cornerVal = Math.floor(currentRingSize / 2);
                    corners = {
                        bottomRight: {x: cornerVal,  y: -cornerVal},
                        topRight: {x: cornerVal,  y: cornerVal},
                        topLeft: {x: -cornerVal,  y: cornerVal},
                        bottomLeft: {x: -cornerVal,  y: -cornerVal}
                    };
                }
                break;
            }
            default:
                throw new Error(`${currentDirection} isn't a direction :(`);
        }
    }

    return val;
}

console.log(spiralize(368078));
