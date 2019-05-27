class BinarySearchNode extends BinaryNode {
    constructor(nodeKey, nodeParent) {
        super(nodeKey, nodeParent);
    }
}

class BinarySearchTree extends BinaryTree {
    constructor() {
        super();
    }

    async insertKey(key) {
        super.insertKey(key);
        let node = new BinarySearchNode(key, null);
        await this._insertNode(node);
    }

    async deleteKey(key) {
        this.deletedView = null;
        this._root = await this._deleteKey(this._root, key);
        if (this.deletedView != null) {
            treeView.endDeletion(makeMatrix(this), this.deletedView);
        }
    }

    async searchKey(key) {
        super.searchKey(key);
        let current = this._root;
        while (current != null) {
            await treeView.findNode(current).blink(colors['green']);
            if (current.key > key) {
                current = current.left;
            } else if (current.key < key) {
                current = current.right;
            } else {
                await treeView.findNode(current).blink(colors['red']);
                return current;
            }
        }
        return null;
    }

    async _insertNode(node) {
        if (this._root == null) {
            this._root = node;
            treeView.createNewNode(node);
            treeView.endInsertion(makeMatrix(this));
        } else {
            let current = this._root;
            treeView.createNewNode(node);

            while (current != null) {
                await treeView.compareWith(current);
                if (current.key > node.key) {
                    await treeView.moveLeft();
                    if (current.left == null) {
                        current.left = node;
                        node.parent = current;
                        break;
                    } else {
                        current = current.left;
                    }
                } else {
                    await treeView.moveRight();
                    if (current.right == null) {
                        current.right = node;
                        node.parent = current;
                        break;
                    } else {
                        current = current.right;
                    }
                }
            }

            treeView.endInsertion(makeMatrix(this));
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
                return left;
            }
            let min = this._findMin(right);
            min.right = this._deleteMin(right);
            min.left = left;

            return min;
        }
        return node;
    }

}
