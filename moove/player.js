import * as draw from '../src/utils/draw.js';
import { Vector } from '../src/utils/vector.js';

function getRandomInt(max) {
    var a = Math.floor(Math.random() * max);
    if (a == 0)
        return 3;
    return a;
}

const colors = ['a', 'red', 'green', 'blue', 'orange', 'pink', 'yellow', 'purple', 'white', 'grey', 'brown'];


export class Player {
    constructor(x, y, shape, size, c) {
        this.pos = new Vector(x, y);
        this.size = size;
        this.i = shape;
        this.context = c;
        this.color = colors[getRandomInt(10)];
    }
    draw() {
        if (this.i == 1)
            draw.square(this.pos.x, this.pos.y, this.size, this.color, this.context);
        else
            draw.circle(this.pos.x, this.pos.y, this.size, this.color, this.context);
        }
    set_pos(x, y) {
        this.pos = new Vector(x, y);
    }
    moove(x, y) {
        this.pos.x += x;
        this.pos.y += y;
        if (this.pos.x + this.size > innerWidth)
            this.pos.x = innerWidth - this.size;
        if (this.pos.x < this.size)
            this.pos.x = this.size;
        if (this.pos.y + this.size > innerHeight)
            this.pos.y = innerHeight - this.size;
        if (this.pos.y < this.size)
            this.pos.y = this.size;
    }
    swap() {
        if (this.i == 1)
            this.i = 0;
        else
            this.i = 1;
        this.draw();
    }
}
