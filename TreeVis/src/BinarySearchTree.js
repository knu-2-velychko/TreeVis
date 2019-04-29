class BinarySearchNode extends BinaryNode {
    constructor(nodeKey, nodeParent) {
        super(nodeKey, nodeParent);
    }
}

class BinarySearchTree extends BinaryTree {
    constructor() {
        super();
    }

    insertKey(key) {
        super.insertKey(key);
        let node = new BinarySearchNode(key, null);
        this._insertNode(node);
    }

    //TODO: deletion
    deleteKey(key) {
        this._root = this._deleteKey(this._root, key);
    }

    searchKey(key) {
        super.searchKey(key);
        let current = this._root;
        while (current != null) {
            if (current.key > key) {
                current = current.left;
            } else if (current.key < key) {
                current = current.right;
            } else {
                return current;
            }
        }
        return null;
    }

    _insertNode(node) {
        if (this._root == null) {
            this._root = node;
        } else {
            let current = this._root;
            while (current != null) {
                if (current.key > node.key) {
                    if (current.left == null) {
                        current.left = node;
                        node.parent = current;
                        break;
                    } else {
                        current = current.left;
                    }
                } else {
                    if (current.right == null) {
                        current.right = node;
                        node.parent = current;
                        break;
                    } else {
                        current = current.right;
                    }
                }
            }
        }
    }

    _findMin(node) {
        let current = node;
        while (current.left != null) {
            current = current.left;
        }
        return current;
    }

    _deleteMin(node) {
        if (node.left == null)
            return node.right;
        node.left = this._deleteMin(node.left);
        return node;
    }

    _deleteKey(node, key) {
        if (node == null) {
            return null;
        }
        if (key < node.key) {
            node.left = this._deleteKey(node.left, key);
        } else if (key > node.key) {
            node.right = this._deleteKey(node.right, key);
        } else {
            let left = node.left;
            let right = node.right;
            node = null;
            if (right == null) {
                return left;
            }
            let min = this._findMin(right);
            min.right = this._deleteMin(right);
            min.left = left;
            return min;
        }
    }

}
