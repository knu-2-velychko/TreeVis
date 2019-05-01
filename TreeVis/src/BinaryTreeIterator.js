class BinaryTreeIterator {
    constructor(tree) {
        this.current = {node: tree._root, depth: 0, pos: 0};
        this.queue = [];
    }

    isEqual(other) {
        return this.current.node === other.current.node;
    }

    get getCurrent() {
        return this.current.node;
    }

    get getDepth() {
        return this.current.depth;
    }

    get getPos() {
        return this.current.pos;
    }

    next() {
        if (this.current.left != null)
            this.queue.push({node: this.current.left, depth: this.current.depth + 1, pos: this.current.pos * 2});
        if (this.current.left != null)
            this.queue.push({node: this.current.right, depth: this.current.depth + 1, pos: this.current.pos * 2 + 1});
        if (!this.queue.empty()) {
            this.current = this.queue[0];
            this.queue.shift();
        } else {
            this.current = null;
        }
    }

    get end() {
        return null;
    }
}

let makeMatrix = function (tree) {
    let iterator = BinaryTreeIterator(tree);
    let matrix = {};
    let tmp = {};
    let currentDepth = 0;
    while (!iterator.isEqual(null)) {
        if (currentDepth !== iterator.getDepth) {
            matrix.push(tmp);
            tmp = {};
            currentDepth++;
        }
        tmp.push({pos: iterator.getPos, node:iterator.getCurrent});
    }
    return matrix;
};