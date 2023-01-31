export function draw(x, y, radius, color, c) {
    c.beginPath();
    c.arc(x, y, radius, 0, 7, false);
    c.fillStyle = color;
    c.fill();
}
