export function square(x, y, length, color, c) {
    c.fillStyle = color;
    c.fillRect(x - length / 2, y - length / 2, length, length);
}

export function circle(x, y, radius, color, c) {
    c.beginPath();
    c.arc(x, y, radius / 2, 0, 7);
    c.fillStyle = color;
    c.fill();
}
