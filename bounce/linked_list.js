export class Node {
    constructor(element)
    {
        this.element = element;
        this.next = null
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
    moove_list() {
        var curr = this.head;
        while (curr) {
            curr.element.moove();
            curr = curr.next;
        }
    }
    list_gravity(g) {
        var curr = this.head;
        while (curr) {
            curr.element.gravity(g);
            curr = curr.next;
        }
    }
    resetgravity() {
        var curr = this.head;
        while (curr) {
            curr.element.resetgravity();
            curr = curr.next;
        }
    }
}
