export class Square {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.color = 'red'
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.x - this.length / 2, this.y - this.length / 2, this.length, this.length);
    }
    set_pos(x, y) {
        this.x = x;
        this.y = y;
    }
    moove(x, y) {
        this.x += x;
        this.y += y;
        if (this.x + this.length > innerWidth)
            this.x = innerWidth - this.length;
        if (this.x < 0)
            this.x = 0;
        if (this.y + this.length > innerHeight)
            this.y = innerHeight - this.length;
        if (this.y < 0)
            this.y = 0;
    }
    clear() {
        c.clearRect(this.x - this.length / 2, this.y - this.length / 2, this.length, this.length);
    }
}

export class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = 'red'
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius / 2, 0, 7);
        c.fillStyle = this.color;
        c.fill();
    }
    set_pos(x, y) {
        this.x = x;
        this.y = y;
    }
    moove(x, y) {
        this.x += x;
        this.y += y;
        if (this.x + this.radius > innerWidth)
            this.x = innerWidth - this.radius;
        if (this.x < 0)
            this.x = 0;
        if (this.y + this.radius > innerHeight)
            this.y = innerHeight - this.radius;
        if (this.y < 0)
            this.y = 0;
    }
}
