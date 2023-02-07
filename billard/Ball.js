import { Vector } from '../src/utils/vector.js';

const t_lim = {
    top: innerHeight * 0.1,
    left: innerWidth * 0.1,
    right: innerWidth * 0.9,
    bottom: innerHeight * 0.8
};

function abs(nb) {
    if (nb < 0)
        return -nb;
    return nb;
}

export class Ball {
    constructor(x, y, vx, vy, radius, color, context) {
        this.pos = new Vector(x, y);
        this.vector = new Vector(vx, vy);
        this.radius = radius;
        this.color = color;
        this.speed = 1;
        this.c = context;
    }
    draw() {
        this.c.beginPath();
        this.c.arc(this.pos.x, this.pos.y, this.radius, 0, 7, false);
        this.c.fillStyle = this.color;
        this.c.fill();
        this.c.stroke();
    }
    moove(x, y) {
        this.pos.x += x * this.speed;
        this.pos.y += y * this.speed;
        if (this.pos.x - this.radius < t_lim.left) {
            this.pos.x = t_lim.left + this.radius;
            this.vector.x = -this.vector.x*0.7;
            this.vector.y = this.vector.y*0.7;
        }
        if (this.pos.x + this.radius > t_lim.right) {
            this.pos.x = t_lim.right - this.radius;
            this.vector.x = -this.vector.x*0.7;
            this.vector.y = this.vector.y*0.7;
        }
        if (this.pos.y - this.radius < t_lim.top) {
            this.pos.y = t_lim.top + this.radius;
            this.vector.y = -this.vector.y*0.7;
            this.vector.x = this.vector.x*0.7;
        }   
        if (this.pos.y + this.radius > t_lim.bottom) {
            this.pos.y = t_lim.bottom - this.radius;
            this.vector.y = -this.vector.y*0.7;
            this.vector.x = this.vector.x*0.7;
        }
        if (abs(this.vector.x) + abs(this.vector.y) < 0.007) {
            this.vector.x = 0;
            this.vector.y = 0;
        }
    }
}
