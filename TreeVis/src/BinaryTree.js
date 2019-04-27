class BinaryNode extends AbstractNode {
    constructor() {
        super();
        if (this.constructor === BinaryNode) {
            throw new TypeError('Abstract class "BinaryNode" cannot be instantiated directly.');
        }
        this.children = [null, null];
    }

    get left() {
        return this.children[0];
    }

    set left(_left) {
        this.children[0] = _left;
    }

    get right() {
        return this.children[1];
    }

    set right(_right) {
        this.children[1] = _right;
    }

    get key() {
        return this.keys[0];
    }

    set key(_key) {
        this.keys[0] = _key;
    }
}

class BinaryTree extends AbstractTree {
    constructor() {
        super();
        if (this.constructor === BinaryTree) {
            throw new TypeError('Abstract class "BinaryNode" cannot be instantiated directly.');
        }
    }
}

