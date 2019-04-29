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

    //TODO: insertion
    insertKey(newKey) {
        let node = new AVLNode(newKey, null);
        super._insertNode(node);
        let current = node;
        while (current != null) {
            current = this._balance(current);
            if (current != null)
                current = current.parent;
        }
        this.print(this._root);
    }

    //TODO: deletion
    deleteKey(_key) {
        //super.deleteKey(_key);
    }

    _balance(node) {
        node.setHeight();
        console.log('balance');
        console.log(node.balanceFactor);
        if (node.balanceFactor === 2) {
            if (node.right != null && node.right.balanceFactor < 0) {
                node.right = this._rotateRight(node.right);
            }
            return this._rotateLeft(node);
        } else if (node.balanceFactor === -2) {
            if (node.left != null && node.left.balanceFactor > 0) {
                node.left = this._rotateLeft(node.left);
            }
            return this._rotateRight(node);
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
    };

    _rotateRight(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        tmp.setHeight();
        node.setHeight();
        return tmp;
    };

    print(node) {
        console.log(node.key);
        if (node.left != null) {
            console.log('left');
            this.print(node.left);
        }
        if (node.right != null) {
            console.log('right');
            this.print(node.right);
        }
    }
}