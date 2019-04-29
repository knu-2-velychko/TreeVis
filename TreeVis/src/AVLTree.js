class AVLNode extends BinarySearchNode {
    constructor(nodeKey, nodeParent) {
        super(nodeKey, nodeParent);
        this._height = 1;
    }

    get balanceFactor() {
        if (this.right == null) {
            if (this.left != null) {
                return 2;
            }
            return 1;
        } else if (this.left == null) {
            return 1;
        }
        return this.left._height - this.right._height;
    }

    setHeight() {
        if (this.right == null) {
            if (this.left != null) {
                this._height = this.left._height;
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

    //TODO: insertion
    insertKey(newKey) {
        var node = new AVLNode(newKey, null);
        super._insertNode(node);
        var current = node;
        while (current != null) {
            current = this._balance(current);

            if (current != null)
                current = current.parent;


        }
    }

    //TODO: deletion

    _balance(node) {
        node.setHeight();
        if (node.balanceFactor == 2) {
            if (node.right && node.right.balanceFactor < 0) {
                node.right = this._rotateRight(node.right);
            }
            return this._rotateLeft(node);
        }
        if (node.balanceFactor == -2) {
            if (node.left && node.left.balanceFactor > 0) {
                node.left = this._rotateLeft(node.left);
            }
            return this._rotateRight(node);
        }
        return node;
    }

    _rotateLeft(node) {
        var tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        tmp.setHeight();
        node.setHeight();
        return tmp;
    }

    _rotateRight(node) {
        var tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        tmp.setHeight();
        node.setHeight();
        return tmp;
    }
}