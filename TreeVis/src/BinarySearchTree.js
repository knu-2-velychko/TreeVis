class BinarySearchNode extends BinaryNode {
    constructor(nodeKey, nodeParent) {
        super(nodeKey, nodeParent);
    }
}

class BinarySearchTree extends BinaryTree {
    constructor() {
        super();
    }

    insertKey(newKey) {
        super.insertKey(newKey);
        if (this._root == null) {
            this._root = new BinarySearchNode(newKey);
        } else {
            var current = this._root;
            while (current != null) {
                if (current.getKey > newKey) {
                    if (current.left === null) {
                        current.left = new BinarySearchNode(newKey);
                        break;
                    } else {
                        current = current.left;
                    }
                } else {
                    if (current.right == null) {
                        current.right = new BinarySearchNode(newKey);
                        break;
                    } else {
                        current = current.right;
                    }
                }
            }
        }
    }
}