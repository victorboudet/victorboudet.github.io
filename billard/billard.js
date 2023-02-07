import { LinkedList } from "./LinkedList.js";
import { Ball } from "./Ball.js";
const canvas = document.getElementById('billard');
resize_canva();
const c = canvas.getContext('2d');

addEventListener("resize", resize_canva)

function resize_canva() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

var mpos = {x: 0, y: 0};
var is_pressed = false;
var on = false;
const init_order = [1, 2, 1, 1, 3, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2];
const bsize = 15;
addEventListener("mousedown", press);
addEventListener("mouseup", unpress);
addEventListener("mousemove", updatemouse);

function abs(nb) {
    if (nb < 0)
        return -nb;
    return nb;
}

function press() {
    is_pressed = true;
}

function unpress() {
    if (on) {
        console.log("second");
        nv = {x: ball.pos.x - mpos.x, y: ball.pos.y - mpos.y};
        console.log(nv);
        on = false;
        ball.vector = {x: nv.x/90, y: nv.y/90};
    }
    is_pressed = false;
}

// var ball = new Ball(200, 200, 0, 0, 15, "white", c);

function updatemouse(event) {
    mpos.x = event.clientX;
    mpos.y = event.clientY;
}

function is_collider(ball) {
    console.log("test");
    if (ball.pos.x  - mpos.x < bsize && ball.pos.x - mpos.x > -bsize) {
        console.log("test2");
        if (ball.pos.y - mpos.y < bsize && ball.pos.y - mpos.y > -bsize) {
            return true;
        }
    }
    return false;
}

var nv = {x: 0, y: 0};

function init_balls() {
    let balls = new LinkedList();
    // balls.add(new Ball(innerWidth*0.30,innerHeight*0.45, 0, 0, bsize, "white", c));
    let pos = {x: innerWidth*0.7, y: innerHeight*0.45, col: 0, row: 0};
    for (let i = 0; i < 15; i++) {
        if (init_order[i] == 1) {
            balls.add(new Ball(pos.x, pos.y, 0, 0, bsize, "red", c));
        } else if (init_order[i] == 2) {
            balls.add(new Ball(pos.x, pos.y, 0, 0, bsize, "blue", c));
        } else if (init_order[i] == 3) {
            balls.add(new Ball(pos.x, pos.y, 0, 0, bsize, "black", c));
        }
        pos.col += 1;
        if (pos.col > pos.row) {
            pos.col = 0;
            pos.row += 1;
            pos.y += bsize*1.2 * pos.row + bsize*(pos.row-1);
            pos.x += bsize*2;
        } else {
            pos.y -= bsize*2.2;
        }
    }
    return balls;
}

let ball = new Ball(innerWidth*0.30,innerHeight*0.45, 0, 0, bsize, "white", c);
let balls = init_balls();
function draw_line(bpos, mpos) {
    c.beginPath();
    c.moveTo(bpos.x, bpos.y);
    c.lineTo(mpos.x, mpos.y);
    c.stroke();
}

async function launch(ball) {
    if (on) { 
        draw_line(ball.pos, mpos);
        console.log("third");
    } else if (is_collider(ball)) {
        console.log("first");
        on = true;
    }
}

function push(b1, b2) {
    let dist = b1.pos.subtr(b2.pos);
    let pen_d = b1.radius + b2.radius - dist.mag();
    let pen_r = dist.unit().mult(pen_d / 2);
    b1.vector.x += pen_r.x;
    b1.vector.y += pen_r.y;
    b2.vector.x += -pen_r.x;
    b2.vector.y += -pen_r.y;
}

function is_collid(b1, b2) {
    if(b1.radius + b2.radius >= b2.pos.subtr(b1.pos).mag()){
        return true;
    } else {
        return false;
    }
}

// function check_collids(list) {
//     let node     = list.head;
//     while (node) {
//         let node2 = node.next;
//         while (node2) {
//             if (is_collid(node.element, node2.element)) {
//                 push(node.element, node2.element);
//             }
//             node2 = node2.next;
//         }
//         node = node.next;
//     }
// }

// let reds = new LinkedList();
// reds.add(new Ball(innerWidth*0.6, 500, 0, 0, 10, "red", c));
setInterval(loop, 1);

function loop() {
    ball.moove(ball.vector.x, ball.vector.y);
    // ball.moove();
    // check_collids(balls)
    c.clearRect(0, 0, innerWidth, innerHeight);
    balls.printList();
    ball.draw();
    if (ball.vector.x != 0) {
        if (abs(ball.vector.x) + abs(ball.vector.y) > 1) {
            ball.vector.x *= 0.999;
            ball.vector.y *= 0.999;
        } else if (abs(ball.vector.x) + abs(ball.vector.y) > 0.5) {
            ball.vector.x *= 0.995;
            ball.vector.y *= 0.995;
        } else {
            ball.vector.x *= 0.99;
            ball.vector.y *= 0.99;
        }
        // console.log(ball.vector);
    } else if (is_pressed) {
        launch(ball);
    }
}
