export function draw(x, y, length, color, c) {
    c.fillStyle = color;
    c.fillRect(x - length / 2, y - length / 2, length, length);
}
