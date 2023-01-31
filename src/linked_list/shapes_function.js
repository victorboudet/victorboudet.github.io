import { Entity } from '../shapes/Entity.js';

export function printList(list) {
    var curr = list.head;
    while (curr) {
        curr.element.draw();
        curr = curr.next;
    }
}

export function collids_list(list) {
    var curr = list.head;
    while (curr) {
        curr.element.collids();
        curr = curr.next;
    }
}

export function moove_list(list, x, y) {
    var curr = list.head;
    while (curr) {
        curr.element.moove(x, y);
        curr = curr.next;
    }
}

function getRandomInt(max) {
    var a = Math.floor(Math.random() * max);
    if (a == 0)
        return 3;
    return a;
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


export function vector_moove(list, c) {
    var curr = list.head;
    var a = 0;
    for (var i = list.size; i > 0; i--) {
        a = curr.element.moove(curr.element.vector.x, curr.element.vector.y);
        if (a == 2) {
            console.log("collids");
            if (curr.element.vector.x > 0)
                curr.element.vector.x = getRandomInt(10);
            else
                curr.element.vector.x = -getRandomInt(10);
            curr.element.vector.x = getRandomInt(10)*(curr.element.vector.x/curr.element.vector.x);
            list.add(new Entity(curr.element.pos.x, curr.element.pos.y, -curr.element.vector.x, curr.element.vector.y, "circle", 10, getRandomColor(), c));
        // check_limit(list, curr.element, limits);
        } else if (a == 1) {
            console.log("collids");
            if (curr.element.vector.y > 0)
                curr.element.vector.y = getRandomInt(10);
            else
                curr.element.vector.y = -getRandomInt(10);
            list.add(new Entity(curr.element.pos.x, curr.element.pos.y, curr.element.vector.x, -curr.element.vector.y, "circle", 10, getRandomColor(), c));
        }
        curr = curr.next;
    }
}
