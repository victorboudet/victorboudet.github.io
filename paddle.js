/*
** Project, 17/11/2022
** my_ls
** File description:
** script
*/

const { abs, sqrt } = require("mathjs");

 
const stage = document.getElementById('paddle'),
    ctx = stage.getContext("2d"),
    wid = 20,
    hei = 200,
    pareax = 1850,
    pareay = 940,
    movey = 30;

let x = 0,
    y = 0;

function drawRect(x, y, wid, hei)
{
    ctx.fillStyle = '#666';
    ctx.fillRect(x, y, wid, hei);
}

drawRect(x, y, wid, hei);
drawCirc(100, 100);
drawCirc(500, 500);

window.onkeydown = function(event) {
    let keyPr = event.keyCode;
    
    if (keyPr === 38 && y > wid) {
        y = y - movey;
    } else if (keyPr === 40 && y < pareay - hei ) {
        y = y + movey;
    }

    ctx.clearRect(0, 0, pareax, pareay);
    drawRect(x, y, wid, hei);
};

window.onmousemove = function(event) {
    let xci = event.clientX,
        yci = event.clientY;
        ctx.clearRect(xci - 50, yci - 50, xci + 50, yci + 50);
    drawCirc(xci, yci);
    documents.getElementById("paddle").innerHTML = coords;
}

function drawCirc(x, y) {
ctx.beginPath();
ctx.arc(x, y, 50, 0, 2*Math.PI, false);
ctx.fillStyle = 'yellow';
ctx.fill();
}