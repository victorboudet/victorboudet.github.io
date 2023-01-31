export class Node {
    constructor(element)
    {
        this.element = element;
        this.next = null
        this.index = 0;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    add(element) {
        if (this.size > 3000)
            return;
        var node = new Node(element);
        var current;
 
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
 
            while (current.next) {
                current = current.next;
            }
            current.next = node;
            current.index = this.size;
            current.element.index = this.size;
        }
        this.size++;
    }
    printList() {
        var curr = this.head;
        while (curr) {
            curr.element.draw();
            curr = curr.next;
        }
    }
    moove_list(x, y) {
        var curr = this.head;
        while (curr) {
            curr.element.moove(x, y);
            curr = curr.next;
        }
    }
    collids_list() {
        var curr = this.head;
        while (curr) {
            curr.element.collids();
            curr = curr.next;
        }
    }
}
