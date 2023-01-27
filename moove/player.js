import * as draw from '../draw.js';

export class Player {
    constructor(x, y, shape, size, c) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.i = shape;
        this.context = c;
    }
    draw() {
        if (this.i == 1)
            draw.square(this.x, this.y, this.size, 'red', this.context);
        else
            draw.circle(this.x, this.y, this.size, 'red', this.context);
        }
    set_pos(x, y) {
        this.x = x;
        this.y = y;
    }
    moove(x, y) {
        this.x += x;
        this.y += y;
        if (this.x + this.size / 2 > innerWidth)
            this.x = innerWidth - this.size / 2;
        if (this.x < this.size / 2)
            this.x = this.size / 2;
        if (this.y + this.size / 2 > innerHeight)
            this.y = innerHeight - this.size / 2;
        if (this.y < this.size / 2)
            this.y = this.size / 2;
    }
    swap() {
        if (this.i == 1)
            this.i = 0;
        else
            this.i = 1;
        this.draw();
    }
}
