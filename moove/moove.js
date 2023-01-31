import { Entity } from '../src/shapes/Entity.js';
import * as llist from '../src/linked_list/shapes_function.js';
import { LinkedList } from '../src/linked_list/LinkedList.js';

const speed = 2;
const nballs = 170;
const size = 30;
const limit = {
    xmin: 0,
    xmax: innerWidth,
    ymin: 0,
    ymax: innerHeight,
};

// addEventListener('resize', function() {
//     canvas.width = innerWidth;
//     canvas.height = innerHeight;
//     limit.xmax = innerWidth;
//     limit.ymax = innerHeight;
// });

const canvas = document.getElementById('Square');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

const square = new Entity(1000, 850, 0, 0, "Circle", size*2, "white", c);
const list = new LinkedList();
list.add(square);
for (let i = 1, j = 1, k = 0; k < nballs; i++, k++) {
    list.add(new Entity(i*(size*3), size*j*3, 2, size, "circle", 40, getRandomColor(), c));
    if ((i+1)*(size*3) >= innerWidth) {
        j++;
        i = 0;
    }
}

var keysquare = [
    [false, function(){square.moove(0, -10*speed)}],
    [false, function(){square.moove(0, 10*speed)}],
    [false, function(){square.moove(-10*speed, 0)}],
    [false, function(){square.moove(10*speed, 0)}],
];

setInterval(gameLoop, 10);

onkeydown = function(event) {
    let keyPr = event.keyCode;
    if (keyPr === 38)
        keysquare[0][0] = true;
    if (keyPr === 40)
        keysquare[1][0] = true;
    if (keyPr === 37)
        keysquare[2][0] = true;
    if (keyPr === 39)   
        keysquare[3][0] = true;
    if (keyPr === 32)
        square.swap();
    if (keyPr === 49)
        window.location.href = "../index.html";
}

onkeyup = function(event) {
    let keyPr = event.keyCode;
    if (keyPr === 38)
        keysquare[0][0] = false;
    if (keyPr === 40)
        keysquare[1][0] = false;
    if (keyPr === 37)
        keysquare[2][0] = false;
    if (keyPr === 39)
        keysquare[3][0] = false;
}

function getRandomColor() {
    const colors = ['red',
                    'green',
                    'blue',
                    'orange',
                    'pink',
                    'yellow',
                    'purple',
                    'grey',
                    'brown'];
    var a = Math.floor(Math.random() * 10);
    return colors[a];
}

function moove_square()
{
    for (let i = 0; i < 4; i++) {
        if (keysquare[i][0] === true) {
            keysquare[i][1]();
        }
    }
}

function push(b1, b2) {
    let dist = b1.pos.subtr(b2.pos);
    let pen_d = b1.size + b2.size - dist.mag();
    let pen_r = dist.unit().mult(pen_d / 2);
    b1.moove(pen_r.x, pen_r.y, limit);
    b2.moove(-pen_r.x, -pen_r.y, limit);
}

function is_collid(b1, b2) {
    if(b1.size + b2.size >= b2.pos.subtr(b1.pos).mag()){
        return true;
    } else {
        return false;
    }
}

function check_collids(list) {
    let node = list.head;
    while (node) {
        let node2 = node.next;
        while (node2) {
            if (is_collid(node.element, node2.element)) {
                push(node.element, node2.element);
            }
            node2 = node2.next;
        }
        node = node.next;
    }
}

function gameLoop() {
    moove_square();
    check_collids(list);
    c.clearRect(0, 0, innerWidth, innerHeight);
    llist.printList(list);
    square.draw(c);
}
