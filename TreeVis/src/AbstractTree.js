class AbstractNode {
    constructor(_key) {
        this.keys = [{_key}];
        this.children = [];
    }
}

class AbstractTree {
    constructor() {
        this.root = null;
    }
}