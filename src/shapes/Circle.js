import { Vector } from '../vector.js';

export class Circle {
    constructor(x, y, r, color, c) {
        this.pos = new Vector(x, y);
        this.r = r;
        this.color = color;
        this.c = c
    }
    draw() {
        this.c.beginPath();
        this.c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
        this.c.fillStyle = this.color;
        this.c.fill();
    }
    set_pos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }
    moove(x, y) {
        this.pos.x += x;
        this.pos.y += y;
    }
}
