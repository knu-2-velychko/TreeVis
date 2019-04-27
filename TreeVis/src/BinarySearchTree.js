class BinarySearchNode extends BinaryNode {
    constructor() {
        super();
    }
}

class BinarySearchTree extends BinaryTree {
    constructor() {
        super();
    }

    insertKey(_key) {
        super.insertKey(_key);
        if (this.root == null) {
            this.root = new BinarySearchNode(_key);
        } else {
            var current = this.root;
            if (current.getKey > _key) {
                if (current.left == null) {
                    current.left = new BinarySearchNode(_key);
                } else {
                    current = current.left;
                }
            } else {
                if (current.right == null) {
                    current.right = new BinarySearchNode(_key);
                } else {
                    current = current.right;
                }
            }
        }
    }
}