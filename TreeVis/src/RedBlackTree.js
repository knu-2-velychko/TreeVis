class RedBlackNode extends BinaryNode {
    constructor(nodeKey, nodeParent) {
        super(nodeKey, nodeParent);
        let Color = Object.freeze({"red": 1, "black": 2})
        this._color = Color.red;
    }

    get color() {
        return this._color;
    }

    set color(newColor) {
        if (newColor == Color.red || newColor == Color.black) {
            this._color = newColor;
        }
    }

    get grandparent() {
        return this.parent.parent;
    }

    get uncle() {
        var g = this.grandparent;
        if (g.left == this.parent)
            return g.right;
        else
            return g.left;
    }
}

class RedBlackTree extends BinarySearchTree {
    constructor() {
        super();
    }

    insertKey(newKey) {
        var node = new RedBlackNode(newKey, null);
        super._insertNode(node);
        this._insertCase1(node);
    }

    _insertCase1(node) {
        if (node.parent == nullptr) {
            node.color = Color.black;
        } else {
            this._insertCase2(node);
        }
    }

    _insertCase2(node) {
        if (node.parent.color != Color.black) {
            this._insertCase3(node);
        }
    }

    _insertCase3(node) {
        var g = node.grandparent;
        var u = node.uncle;

        if (u != null && u.color == Color.red) {
            node.parent.color = Color.black;
            u.color = Color.black;
            g.color = Color.red;
            this._insertCase1(g);
        } else {
            this._insertCase4(node);
        }
    }

    _insertCase4(node) {
        var g = node.grandparent;

        if (node == node.parent.right && node.parent == g.left) {
            this._rotateLeft(node.parent);
            node = node.left;
        } else if (node == node.parent.left && node.parent == g.right) {
            this._rotateRight(node.parent);
            node = node.right;
        }
        this._insertCase5(node);
    }

    _insertCase5(node) {

    }

    _rotateLeft(node) {

    }

    _rotateRight(node) {

    }

}