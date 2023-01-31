export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    subtr(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    mag() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
    unit() {
        if (this.mag() === 0) {
            return new Vector(0, 0);
        } else {
            return new Vector(this.x / this.mag(), this.y / this.mag());
        }
    }
    mult(x) {
        return new Vector(this.x * x, this.y * x);
    }
}
