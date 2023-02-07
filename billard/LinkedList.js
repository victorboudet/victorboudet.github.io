export class Node {
    constructor(element)
    {
        this.element = element;
        this.next = null
    }
}

export class LinkedList {
    constructor(limit) {
        this.head = null;
        this.size = 0;
        this.limit = limit;
    }
    add(element) {
        if (this.size > this.limit) {
            console.log("Can't add more elements")
            return;
        }
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
}
