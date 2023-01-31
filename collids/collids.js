import * as draw from '../draw.js';
import { LinkedList } from './linked_list.js';
import { Vector } from '../vector.js';

const canvas = document.getElementById('Collids');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');
c.font = "20px Arial";

function getRandomInt(max) {
    var a = Math.floor(Math.random() * max);
    if (a == 0)
        return 3;
    return a;
}

const colors = ['a', 'red', 'green', 'blue', 'orange', 'pink', 'yellow', 'purple', 'grey', 'brown'];

function clearCircle(context,x,y,radius) {
	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, true);
	context.clearRect(x-radius,y-radius,radius*2,radius*2);
}

function dot_product(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

function abso(x) {
    if (x < 0)
        return -x;
    return x;
}

function round(nb) {
    return Math.round(nb * 1000) / 1000;
}

class mooving_shapes {
    constructor(x, y, radius, vx, vy) {
        this.pos = new Vector(x, y);
        this.radius = radius;
        this.color = colors[getRandomInt(11)];
        this.vector = new Vector(vx, vy);
        this.speed = 1;
        this.bord = 7;
        this.index = 0;
        this.m = 1;
    }
    draw() {
        // if (this.shat) 
            draw.circle(this.pos.x, this.pos.y, this.radius, this.color, c);
            c.fillStyle = "black";
            let te = abso(this.vector.x) + abso(this.vector.y);
            c.fillText(round(te) + " " + round(this.index) + " | " + round(this.vector.x) + " " + round(this.vector.y), round(this.pos.x), round(this.pos.y - this.radius));
    }
    set_pos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }
    moove() {
        this.pos.x += this.vector.x * this.speed;
        this.pos.y += this.vector.y * this.speed;
        if (this.pos.x - this.radius - this.bord < innerWidth * 0.05) {
            this.pos.x = innerWidth * 0.05 + this.radius + this.bord;
            this.vector.x = -this.vector.x;
        }
        if (this.pos.x + this.radius + this.bord > innerWidth * 0.95) {
            this.pos.x = innerWidth * 0.95 - this.radius - this.bord;
            this.vector.x = -this.vector.x;
        }
        if (this.pos.y - this.radius - this.bord < innerHeight * 0.05) {
            this.pos.y = innerHeight * 0.05 + this.radius + this.bord;
            this.vector.y = -this.vector.y;
        }   
        if (this.pos.y + this.radius + this.bord > innerHeight * 0.70) {
            this.pos.y = innerHeight * 0.70 - this.radius - this.bord;
            this.vector.y = -this.vector.y;
        }
    }
    clear() {
        clearCircle(c, this.pos.x, this.pos.y, this.radius+1);
    }
    collids() {
        let node = list.head;
        // for (var i = 0; i < this.index; i++, node = node.next);
        while (node != null) {
            if (node.element != this) {
                
                let x = (this.pos.x - node.element.pos.x);
                let y = (this.pos.x - node.element.pos.y);
                let r = node.element.radius + this.radius;
                let m1 = this.m,
                    m2 = node.element.m,
                   mass = (2*m2) / (m1 + m2);        
                var v1 = {x: this.vector.x, y: this.vector.y};
                var v2 = {x: node.element.vector.x, y: this.vector.x};
                var v12 = {x: v1.x - v2.x, y: v1.y - v2.y};
                var x12 = {x: x, y: y};
                let x12_len = (x12.x * x12.x + x12.y * x12.y);
                let d = dot_product(v12, x12);
                let f = d / (x12_len * (m1 + m2));
                x12 = {x:x12.x * ((mass*d)/(x12_len * x12_len)), y:x12.y * ((mass*d)/(x12_len * x12_len))};
                let vf = {x: v1.x - x12.x, y: v1.y - x12.y};
                // y1 = this.pos.y,
                // x2 = node.element.pos.x,
                // y2 = node.element.pos.y;
                // var vx1 = this.vector.x,
                // vy1 = this.vector.y,

                // vx2 = node.element.vector.x,
                // vy2 = node.element.vector.y;
                // var dx = abso(x2 - x1),
                // dy = abso(y2 - y1),
                // dvx = abso(vx2 - vx1),
                // dvy = abso(vy2 - vy1),
                // dvdr = dx * dvx + dy * dvy,

                // let dist = m1 + m2;
                // let mf1 = (2 * m2) / (m1+m2),
                // mf2 = (2 * m1) / (m1+m2);
                // var f = dvdr / ((m1 + m2)*(m1 + m2));
                // var tx = x2 + (dx / dist) * m2 - x1 - (dx / dist) * m1,
                // ty = y2 + (dy / dist) * m2 - y1 - (dy / dist) * m1;
                // vx1 = vx1 - f * tx * m2;
                // vy1 = vy1 + f * ty * m2;
                // vx2 = vx2 - f * tx * m1;
                // vy2 = vy2 - f * ty * m1;
                if (r*r >= x*x+y*y) {
                    if (x == 0) {
                        this.vector.x = -this.vector.x;
                    } else if (y == 0) {
                        this.vector.y = -this.vector.y;
                    } else {
                        push(this, node.element);
                    }
                }
            }
            node = node.next;
        }
    }
}

let list = new LinkedList();
list.add(new mooving_shapes(innerWidth / 2 + 20, innerHeight * 0.1, 20, 1, 1));
list.add(new mooving_shapes(innerWidth / 2, (innerHeight * 0.7) + 19, 20, -1, -1));
list.add(new mooving_shapes(innerWidth / 2, innerHeight * 0.6, 20, 1, -1));
setInterval(gameLoop, 1);

function gameLoop() {
    list.collids_list();
    list.moove_list();
    c.clearRect(0, 0, innerWidth, innerHeight);
    list.printList();
}
