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
            this._root = new BinarySearchNode(newKey, null);
        } else {
            var current = this._root;
            while (current != null) {
                if (current.key > newKey) {
                    if (current.left == null) {
                        current.left = new BinarySearchNode(newKey, current);
                        break;
                    } else {
                        current = current.left;
                    }
                } else {
                    if (current.right == null) {
                        current.right = new BinarySearchNode(newKey, current);
                        break;
                    } else {
                        current = current.right;
                    }
                }
            }
        }
    }

    deleteKey(_key) {
        super.deleteKey(_key);
    }

    searchKey(_key) {
        super.searchKey(_key);
        let current = this._root;
        while (current != null) {
            if (current.key > _key) {
                current = current.left;
            } else if (current.key < _key) {
                current = current.right;
            } else {
                return current;
            }
        }
        return null;
    }
}

let getMin = function (node) {

};