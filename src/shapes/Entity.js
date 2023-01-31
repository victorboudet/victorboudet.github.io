import { Vector } from "../utils/vector.js";
import * as s from "./Square.js";
import * as c from "./Circle.js";

let square = {
    draw: s.draw,
};

let circle = {
    draw: c.draw,       
};

let dico = {
    square: square,
    "Square": square,
    "square": square,
    circle: circle,
    "Circle": circle,
    "circle": circle,
};

export class Entity {
    constructor(x, y, vx, vy, shape, length, color, c) {
        this.pos = new Vector(x, y);
        this.vector = new Vector(vx, vy);
        this.size = length;
        this.color = color;
        this.shape = dico[shape];
        this.c = c;
        this.limit = {
            xmin: 0,
            xmax: innerWidth,
            ymin: 0,
            ymax: innerHeight,
        };
    }
    draw() {
        this.shape.draw(this.pos.x, this.pos.y, this.size, this.color, this.c);
    }
    set_pos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }
    moove(x, y) {
        this.pos.x += x;
        this.pos.y += y;
        return this.check_limit(this.limit);
    }
    check_limit(limit) {
        if (this.pos.x - this.size < limit.xmin) {
            this.pos.x = limit.xmin + this.size;
            this.vector.x = -this.vector.x;
            return 1;
        }
        if (this.pos.x + this.size > limit.xmax) {
            this.pos.x = limit.xmax - this.size;
            this.vector.x = -this.vector.x;
            return 1;
        }
        if (this.pos.y - this.size < limit.ymin) {
            this.pos.y = limit.xmin + this.size;
            this.vector.y = -this.vector.y;
            return 2;
        }   
        if (this.pos.y + this.size > limit.ymax) {
            this.pos.y = limit.ymax - this.size;
            this.vector.y = -this.vector.y;
            return 2;
        }
        return 0;
    }
    update_limit(limit) {
        this.limit = limit;
    }

    collid(ent) {
        let dist = this.pos.subtr(ent.pos);
        let pen_d = this.size + ent.size - dist.mag();
        let pen_r = dist.unit().mult(pen_d / 2);
        this.moove(pen_r.x, pen_r.y);
        ent.moove(-pen_r.x, -pen_r.y);
    }
}
