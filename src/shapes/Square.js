export class Square {
    constructor(x, y, length, color, c) {
        this.pos = new Vector(x, y);
        this.length = length;
        this.color = color;
        this.c = c
    }
    draw() {
        this.c.fillStyle = this.color;
        this.c.fillRect(this.pos.x - this.length / 2, this.pos.y - this.length / 2, this.length, this.length);
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