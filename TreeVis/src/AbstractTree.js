class AbstractNode {
    constructor(_key) {
        if (this.constructor === AbstractNode) {
            throw new TypeError('Abstract class "AbstractNode" cannot be instantiated directly.');
        }
        this.keys = [_key];
        this.children = [];
    }
}

class AbstractTree {
    constructor() {
        if (this.constructor === AbstractTree) {
            throw new TypeError('Abstract class "AbstractTree" cannot be instantiated directly.');
        }
        this.root = null;
    }

    insertKey(_key) {

    }

    deleteKey(_key) {

    }

    searchKey(_key) {

    }

    get getRoot() {
        return this.root;
    }
}