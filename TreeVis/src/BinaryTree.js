class BinaryNode extends AbstractNode {
    constructor(nodeKey, nodeParent) {
        super(nodeKey, nodeParent);
        if (this.constructor === BinaryNode) {
            throw new TypeError('Abstract class "BinaryNode" cannot be instantiated directly.');
        }
        this._children = [null, null];
    }

    get left() {
        return this._children[0];
    }

    set left(_left) {
        this._children[0] = _left;
    }

    get right() {
        return this._children[1];
    }

    set right(_right) {
        this._children[1] = _right;
    }

    get key() {
        return this._keys[0];
    }

    set key(nodeKey) {
        this._keys[0] = nodeKey;
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

