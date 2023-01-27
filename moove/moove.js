import { Player } from './player.js';

const canvas = document.getElementById('Square');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

const mx = 1, my = 1;

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

setInterval(gameLoop, 16);
const square = new Player(innerWidth/2, innerHeight/2, 1, 50, c);

function gameLoop() {
    c.clearRect(square.x - ((square.size / 2) +1), square.y - ((square.size/2) + 1), square.size + 1, square.size + 1);
    moove_square()
    square.draw();
}
