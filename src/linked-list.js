const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        const newNode = new Node(data);

        if (this.length === 0) {
            this._head = newNode
            this._tail = newNode;

        } else {
            this._tail.next = newNode;
            newNode.prev = this._tail;

            this._tail = newNode;
        }

        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        if (index < 0 || this.length <= index) {
            return null;
        }

        let current = this._head;
        let pos = 0;

        while (pos < index) {
            current = current.next;
            pos++;
        }

        return current.data;
    }

    insertAt(index, data) {
        if (index < 0 || this.length < index) {
            return this;
        }

        let node = new Node(data);

        if (index === 0) {
            node.next = this._head;
            //this._head.prev = node;

            this._head = node;

        } else if (index === this.length) {
            this._tail.next = node;
            node.prev = this._tail;

            this._tail = node;

        } else {
            let current = this._head;
            let prev = null;
            let pos = 0;

            while (pos < index) {
                prev = current;
                current = current.next;
                pos++;
            }

            prev.next = node;
            node.prev = prev;

            node.next = current;
            current.prev = node;

        }
        this.length++;
        return this;

    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.length = 0;
        this._tail = null;
        this._head = null;
        this.tail = () => null;
        this.head = () => null;
        return this;
    }

    deleteAt(index) {
        if (index < 0 || this.length <= index) {
            return this;
        }

        let current;

        if (index === 0) {
            current = this._head;

            this._head = this._head.next;
            //this._head.prev = null;

        } else if (index === this.length - 1) {
            current = this._tail;

            this._tail = this._tail.prev;
            this._tail.next = null;

        } else {
            current = this._head;

            let prev = null;
            let pos = 0;

            while (pos < index) {
                prev = current;
                current = current.next;
                pos++;
            }

            prev.next = current.next;
            current.next.prev = prev;

        }
        this.length--;
        return this;

    }

    reverse() {
        let list = new LinkedList();
        for (let i = this.length - 1; i >= 0; i--) {
            list.append(this.at(i));
        }
        this._head = list._head;
        this._tail = list._tail;

        return this;
    }

    indexOf(data) {
        let current = this._head;
        let pos = 0;

        while (current) {
            if (current.data === data) {
                return pos;
            }

            current = current.next;
            pos++;
        }

        return -1;
    }
}

module.exports = LinkedList;