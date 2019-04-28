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
        var node = new BinarySearchNode(newKey, null);
        this._insertNode(node);
    }

    //TODO: deletion
    deleteKey(_key) {
        super.deleteKey(_key);
        /*
                var current = this.searchKey(_key);
                if (current != null) {
                    var parent = current.parent;

                    //case 1: leaf node
                    if (current.left == null && current.right == null) {
                        if(parent.left==current){
                            parent.left=null;
                        }

                    }
                }

         */
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

    _insertNode(node) {
        if (this._root == null) {
            this._root = node;
        } else {
            var current = this._root;
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
        return current
    }

    _replaceNodeInParent(node, newNode) {
        if (node.parent != null) {
            if (node == node.parent.left) {
                node.parent.left = newNode;
            } else {
                node.parent.right = newNode;
            }
        }
        if (newNode == null) {
            newNode.parent = node.parent;
        }
    }
}
