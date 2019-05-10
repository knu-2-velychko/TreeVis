class AbstractNode {
    constructor(nodeKey, nodeParent) {
        if (this.constructor === AbstractNode) {
            throw new TypeError('Abstract class "AbstractNode" cannot be instantiated directly.');
        }
        this._keys = [nodeKey];
        this._children = [];
        this._parent = nodeParent;
    }

    get parent() {
        if (typeof this._parent !== 'undefined') {
            return this._parent;
        }
        return null;
    }

    set parent(newParent) {
        this._parent = newParent;
    }

    deleteNode() {
        for (let i of this._children) {
            i.parent = null;
        }
        if (this._parent != null) {
            for (let i of this._parent._children) {
                if (i === this) {
                    i = null;
                }
            }
        }
    }
}

class AbstractTree {

    constructor() {
        if (this.constructor === AbstractTree) {
            throw new TypeError('Abstract class "AbstractTree" cannot be instantiated directly.');
        }
        this._root = null;
    }

    insertKey(newKey) {

    }

    deleteKey(_key) {

    }

    searchKey(_key) {

    }

    get root() {
        return this._root;
    }
}