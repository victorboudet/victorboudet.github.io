export class Node {
    constructor(element)
    {
        this.element = element;
        this.next = null
        this.index = 0;
    }
}

export class LinkedList {
    constructor(lim) {
        this.head = null;
        this.size = 0;
        this.limit = lim
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
            current.index = this.size;
            current.element.index = this.size;
        }
        this.size++;
    }
}
