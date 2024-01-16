/*
** Project, 17/11/2022
** my_ls
** File description:
** script
*/

import * as circles from '../src/shapes/Circle.js';
import { LinkedList } from './linked_list.js';

const canvas = document.getElementById('Bounce');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

function getRandomInt(max) {
    var a = Math.floor(Math.random() * max);
    if (a == 0)
        return 3;
    return a;
}

const colors = ['a', 'red', 'green', 'blue', 'orange', 'pink', 'yellow', 'purple', 'white', 'grey', 'brown'];

class mooving_shapes {
    constructor(x, y, radius, vx, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colors[getRandomInt(11)];
        this.vector = [vx, vy];
        this.speed = 1;
        this.fall = 1;
        this.top = 0;
        this.shat = 0;
    }
    draw() {
        if (this.shat) 
            draw.square(this.x, this.y, this.radius, this.color, c);
        else
            circles.draw(this.x, this.y, this.radius, this.color, c);
    }
    set_pos(x, y) {
        this.x = x;
        this.y = y;
    }
    moove() {
        this.x += this.vector[0] * this.speed;
        this.y += this.vector[1] * this.speed;
        if (this.x + this.radius / 2 > innerWidth) {
            this.x = innerWidth - this.radius / 2;
            this.vector[0] = -getRandomInt(10);
            list.add(new mooving_shapes(this.x, this.y, this.radius, this.vector[0], -this.vector[1]));
        }
        if (this.x < this.radius / 2) {
            this.x = this.radius / 2;
            this.vector[0] = getRandomInt(10);
            list.add(new mooving_shapes(this.x, this.y, this.radius, this.vector[0], -this.vector[1]));
        }
        if (this.y + this.radius / 2 > innerHeight) {
            this.y = innerHeight - this.radius / 2;
            this.vector[1] = -getRandomInt(10);
            list.add(new mooving_shapes(this.x, this.y, this.radius, -this.vector[0], this.vector[1]));
        }
        if (this.y < this.radius / 2) {
            this.y = this.radius / 2;
            this.vector[1] = getRandomInt(10);
            list.add(new mooving_shapes(this.x, this.y, this.radius, -this.vector[0], this.vector[1]));
        }
    }
    gravity(g) {
        if (this.fall) {
            if (!this.top)
                this.top = this.y + ((innerHeight - this.y) * 0.7);
            if (this.y * 0.03 > 8)
                this.y += 8;
            else
                this.y += this.y * 0.03;
        } else {
            this.y -= (this.y - this.top) * 0.1;
            if ((this.y - this.top) * 0.1 < 1) {
                this.fall = 1;
                this.top += ((innerHeight - this.top) * 0.7)
            }
        }
        if (innerHeight - this.top < g / 2)
            this.y = innerHeight - this.radius / 2;
        if (this.y + this.radius / 2 > innerHeight) {
            this.y = innerHeight - this.radius / 2;
            this.fall = 0;
        }
    }
    resetgravity() {
        this.fall = 1;
        this.top = 0;
    }
}

onkeydown = function(event) {
    let keyPr = event.keyCode;
    if (keyPr === 49)
        this.window.location.href = "../index.html";
    if (keyPr === 32) {
        if (g == 0)
            g = 1;
        else {
            g = 0;
            list.resetgravity();
        }
    }
}

setInterval(gameLoop, 25);
let list = new LinkedList(50000);
list.add(new mooving_shapes(200, 200, 10, 4, 4));
let g = 0;
function gameLoop() {
    if (g) {
        list.list_gravity(g);    
    } else {
        list.moove_list();
    }
    c.clearRect(0, 0, innerWidth, innerHeight);
    list.printList();
}