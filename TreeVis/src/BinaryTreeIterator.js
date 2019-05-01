class BinaryTreeIterator {
    constructor(tree) {
        this.current = {node: tree.root, depth: 0, pos: 0};
        this.queue = [];
    }

    isEqual(other) {
        return this.current.node === other.node;
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
        if (this.current.node.left != null) {
            this.queue.push({node: this.current.node.left, depth: this.current.depth + 1, pos: this.current.pos * 2});
        }
        if (this.current.node.right != null) {
            this.queue.push({
                node: this.current.node.right,
                depth: this.current.depth + 1,
                pos: this.current.pos * 2 + 1
            });
        }
        if (!this.queue || !this.queue.length) {
            this.current = {node: null, depth: 0, pos: 0};
        } else {
            this.current = this.queue[0];
            this.queue.shift();
        }
    }

    get end() {
        return {node: null, depth: 0, pos: 0};
    }
}

let makeMatrix = function (tree) {
    let iterator = new BinaryTreeIterator(tree);
    let matrix = [[]];
    let currentDepth = 0;
    while (!iterator.isEqual(iterator.end)) {
        if (currentDepth !== iterator.getDepth) {
            currentDepth++;
            matrix.push([]);
        }
        matrix[currentDepth].push({pos: iterator.getPos, node: iterator.getCurrent});
        iterator.next();
    }
    return matrix;
};