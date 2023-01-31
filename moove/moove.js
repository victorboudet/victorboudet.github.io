import { Player } from './player.js';
// import { Vector } from '../vector.js';
import { LinkedList } from './linked_list.js';

const canvas = document.getElementById('Square');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

const mx = 3, my = 3;

var keysquare = [
    [false, function(){square.moove(0, -10*my)}],
    [false, function(){square.moove(0, 10*my)}],
    [false, function(){square.moove(-10*mx, 0)}],
    [false, function(){square.moove(10*mx, 0)}],
];

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
    b1.moove(pen_r.x, pen_r.y);
    b2.moove(-pen_r.x, -pen_r.y);
}

const square = new Player(1700, 1500, 2, 40, c);
square.draw();
// const square2 = new Player(innerWidth/2 + 100, innerHeight/2 + 10, 2, 50, c);
// const square3 = new Player(innerWidth/2 + 100, innerHeight/2 + 100, 2, 50, c);

const list = new LinkedList();
list.add(square);
for (let j = 1; j < 10; j++) {    
    for (let i = 1; i < 17; i++) {
        list.add(new Player(i*100, 70*j, 2, 30, c));
    }
}
setInterval(gameLoop, 10);

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
    list.printList();
    // list.moove_list(0, 5)
    // square.moove(0, -5)
}
