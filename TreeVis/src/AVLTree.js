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

    async deleteKey(key) {
        this.deletedView = null;
        this._root = await this._deleteKey(this._root, key);
        if (this.deletedView != null) {
            treeView.endDeletion(makeMatrix(this), this.deletedView);
        }
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
    };

    _rotateRight(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        tmp.setHeight();
        node.setHeight();
        return tmp;
    };

    async _deleteKey(node, key) {
        if (node == null) {
            return null;
        }
        await treeView.findNode(node).blink(colors['green']);
        if (key < node.key) {
            node.left = await this._deleteKey(node.left, key);
        } else if (key > node.key) {
            node.right = await this._deleteKey(node.right, key);
        } else {
            await treeView.findNode(node).blink(colors['red']);
            this.deletedView = treeView.findNode(node);

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
        return node;
    }

}