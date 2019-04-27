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
        if (this.parent != null) {
        }
        return null;
    }

    get uncle() {

    }
}

class RedBlackTree extends BinaryTree {
    constructor() {
        super();
    }
}