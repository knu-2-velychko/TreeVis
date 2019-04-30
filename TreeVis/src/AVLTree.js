class AVLNode extends BinarySearchNode {
    constructor(nodeKey, nodeParent) {
        super(nodeKey, nodeParent);
        this._height = 1;
    }

    get balanceFactor() {
        if (this.right == null && this.left == null)
            return 1;
        else if (this.right == null || this.left == null)
            return 2;
        else
            return this.left._height - this.right._height;
    }

    setHeight() {
        if (this.right == null) {
            if (this.left != null) {
                this._height = this.left.height;
            }
        } else if (this.left == null) {
            this._height = this.right._height;

        } else {
            this._height = ((this.left._height > this.right._height) ? this.left._height : (this.right._height + 1));
        }
    }

    get height() {
        return this._height;
    }
}

class AVLTree extends BinarySearchTree {
    constructor() {
        super();
    }

    insertKey(newKey) {
        let node = new AVLNode(newKey, null);
        super._insertNode(node);
        let current = node;
        while (current != null) {
            current = current.parent;
            current = this._balance(current, newKey);
        }
    }

    deleteKey(key) {
        this._root = this._deleteKey(key);
    }

    _balance(node, key) {
        if (node == null)
            return null;
        node.setHeight();

        //left left case
        if (node.balanceFactor > 1 && node.left != null && key < node.left.key) {
            return this._rotateRight(node);
        }
        //right right case
        if (node.balanceFactor < -1 && node.right != null && key > node.right.key) {
            return this._rotateLeft(node);
        }
        //left right case
        if (node.balanceFactor > 1 && node.left != null && key > node.left.key) {
            node.left = this._rotateLeft(node.left);
            return this._rotateRight(node);
        }
        //right left case
        if (node.balanceFactor < -1 && node.right != null && key < node.right.key) {
            node.right = this._rotateRight(node.right);
            return this._rotateLeft(node);
        }
        return node;
    }

    _rotateLeft(node) {
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        tmp.setHeight();
        node.setHeight();
        return tmp;

        let rightChild = node.right;
        node.right = rightChild.left;
        if (node.right != null) {
            node.right.parent = node;
        }
        rightChild.parent = node.parent;
        if (node.parent === nullptr) {
            this._root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }
        rightChild.left = node;
        node.parent = rightChild;
    };

    _rotateRight(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        tmp.setHeight();
        node.setHeight();
        return tmp;
    };

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
                return this._balance(left);
            }
            let min = this._findMin(right);
            min.right = this._deleteMin(right);
            min.left = left;
            return this._balance(min);
        }
    }

}