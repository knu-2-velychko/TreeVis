let checkBinaryTreeOrderInvariant = function (node) {
    if (node != null) {
        if (node.left != null) {
            chai.assert(node.key > node.left.key);
            checkBinaryTreeOrderInvariant(node.left);
        }
        if (node.right != null) {
            chai.assert(node.key < node.right.key);
            checkBinaryTreeOrderInvariant(node.right);
        }
    }
};

let checkRedBlackTreeInvariant = function (node) {
    if (node.parent == null) {
        chai.expect(node.color).to.equal(Color.black);
    } else {
        if (node.color == Color.red) {
            if (node.left != null) {
                chai.expect(node.left.color).to.equal(Color.black);
            }
            if (node.right != null) {
                chai.expect(node.right.color).to.equal(Color.black);
            }
        }
    }
};

let checkAVLTreeInvariant = function (node) {
    if (node != null) {
        let difference = 0;
        if (node.left != null) {
            difference += node.left.height;
        }
        if (node.right != null) {
            difference -= node.right.height;
        }
        chai.assert(Math.abs(difference) <= 2);
        console.log('balance ' + node.balanceFactor);
        console.log('key ' + node.key);
        chai.assert(Math.abs(node.balanceFactor) <= 2);
    }
};

describe('Binary Search Node', () => {
    var node = new BinarySearchNode(3, null);

    it('node should not be empty', () => {
        chai.expect(node.key).to.equal(3);
        chai.expect(node.left).to.equal(null);
        chai.expect(node.right).to.equal(null);
    });
    it('left getter & setter', () => {
        node.left = new BinarySearchNode(2, node);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.left).to.not.equal(null);
        chai.expect(node.left.key).to.equal(2);
    });
    it('right getter & setter', () => {
        node.right = new BinarySearchNode(5, node);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.right).to.not.equal(null);
        chai.expect(node.right.key).to.equal(5);
    });
});

describe('Binary Search Tree', () => {
    it('root should be empty', () => {
        let tree = new BinarySearchTree();
        chai.expect(tree.root).to.equal(null);
    });

    describe('Binary Search Tree insertion', () => {
        let tree = new BinarySearchTree();
        it('Binary Search Tree invariant', () => {
            tree.insertKey(3);
            checkBinaryTreeOrderInvariant(tree.root);
            tree.insertKey(5);
            checkBinaryTreeOrderInvariant(tree.root);
            tree.insertKey(2);
            checkBinaryTreeOrderInvariant(tree.root);
            tree.insertKey(1);
            checkBinaryTreeOrderInvariant(tree.root);
        });
    });

    describe('Binary Search Tree search', () => {
        let tree = new BinarySearchTree();

        it("search should return node with searched key", () => {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
            chai.expect(tree.searchKey(3).key).to.equal(3);
            chai.expect(tree.searchKey(5).key).to.equal(5);
            chai.expect(tree.searchKey(2).key).to.equal(2);
            chai.expect(tree.searchKey(1).key).to.equal(1);
            chai.expect(tree.searchKey(7)).to.equal(null);
        });
    });

    describe('Binary Search Tree delete', () => {
        let tree = new BinarySearchTree();

        it("delete should delete node with key from tree", () => {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
            tree.deleteKey(3);
            checkBinaryTreeOrderInvariant(tree.root);
            chai.expect(tree.searchKey(3)).to.equal(null);
            tree.deleteKey(5);
            checkBinaryTreeOrderInvariant(tree.root);
            chai.expect(tree.searchKey(5)).to.equal(null);
            tree.deleteKey(2);
            checkBinaryTreeOrderInvariant(tree.root);
            chai.expect(tree.searchKey(2)).to.equal(null);
            tree.deleteKey(1);
            checkBinaryTreeOrderInvariant(tree.root);
            chai.expect(tree.searchKey(1)).to.equal(null);
        });
    });
});

describe('Red-Black Tree Node', () => {
    var node = new RedBlackNode(3, null);

    it('node should not be empty', () => {
        chai.expect(node.key).to.equal(3);
        chai.expect(node.left).to.equal(null);
        chai.expect(node.right).to.equal(null);
        chai.expect(node.color).to.equal(Color.red);
    });

    it('left getter & setter', () => {
        node.left = new RedBlackNode(2, node);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.left).to.not.equal(null);
        chai.expect(node.left.key).to.equal(2);
    });

    it('right getter & setter', () => {
        node.right = new RedBlackNode(5, node);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.right).to.not.equal(null);
        chai.expect(node.right.key).to.equal(5);
    });

    it('grandparent and uncle getters should wotk correct', () => {
        node.left = new RedBlackNode(2, node);
        node.left.left = new RedBlackNode(1, node.left);
        node.right = new RedBlackNode(5, node);
        node.right.right = new RedBlackNode(6, node.right);

        var leftGranson = node.left.left;
        var rightGrandson = node.right.right;
        chai.expect(leftGranson.grandparent).to.equal(node);
        chai.expect(leftGranson.uncle).to.equal(node.right);
        chai.expect(rightGrandson.grandparent).to.equal(node);
        chai.expect(rightGrandson.uncle).to.equal(node.left);
    });
});

describe('Red-Black Tree', () => {
    it('root should be empty', () => {
        var tree = new RedBlackTree();

        chai.expect(tree.root).to.equal(null);
    });

    describe('Red Black Tree insertion', () => {
        var tree = new RedBlackTree();

        it('Red Black Tree invariants', () => {
            tree.insertKey(3);
            checkBinaryTreeOrderInvariant(tree.root);
            checkRedBlackTreeInvariant(tree.root);
            tree.insertKey(5);
            checkBinaryTreeOrderInvariant(tree.root);
            checkRedBlackTreeInvariant(tree.root);
            tree.insertKey(2);
            checkBinaryTreeOrderInvariant(tree.root);
            checkRedBlackTreeInvariant(tree.root);
            tree.insertKey(1);
            checkBinaryTreeOrderInvariant(tree.root);
            checkRedBlackTreeInvariant(tree.root);
        });
    });

    describe('Red Black Tree search', () => {
        var tree = new RedBlackTree();

        before(() => {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
        });
        it("search should return node with searched key", () => {
            chai.expect(tree.searchKey(3).key).to.equal(3);
            chai.expect(tree.searchKey(5).key).to.equal(5);
            chai.expect(tree.searchKey(2).key).to.equal(2);
            chai.expect(tree.searchKey(1).key).to.equal(1);
            chai.expect(tree.searchKey(7)).to.equal(null);
        });
    });

    describe('Red Black Tree delete', () => {
        var tree = new RedBlackTree();

        before(() => {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
        });
        it("delete should delete node with key from tree", () => {
            tree.deleteKey(3);
            checkBinaryTreeOrderInvariant(this.root);
            checkRedBlackTreeInvariant(tree.root);
            chai.expect(tree.searchKey(3)).to.equal(null);
            tree.deleteKey(5);
            checkBinaryTreeOrderInvariant(this.root);
            checkRedBlackTreeInvariant(tree.root);
            chai.expect(tree.searchKey(5)).to.equal(null);
            tree.deleteKey(2);
            checkBinaryTreeOrderInvariant(this.root);
            checkRedBlackTreeInvariant(tree.root);
            chai.expect(tree.searchKey(2)).to.equal(null);
            tree.deleteKey(1);
            checkBinaryTreeOrderInvariant(this.root);
            checkRedBlackTreeInvariant(tree.root);
            chai.expect(tree.searchKey(1)).to.equal(null);
        });
    });
});

describe('AVL Tree Node', () => {
    var node = new AVLNode(3, null);

    it('node should not be empty', () => {
        chai.expect(node.key).to.equal(3);
        chai.expect(node.left).to.equal(null);
        chai.expect(node.right).to.equal(null);
        chai.expect(node.height).to.equal(1);
        chai.expect(node.balanceFactor).to.equal(1);
    });

    it('left getter & setter', () => {
        node.left = new AVLNode(2, node);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.left).to.not.equal(null);
        chai.expect(node.left.key).to.equal(2);
        chai.expect(node.height).to.equal(1);
        chai.expect(node.balanceFactor).to.equal(2);
    });

    it('right getter & setter', () => {
        node.right = new AVLNode(5, node);
        chai.expect(node.key).to.equal(3);
        chai.expect(node.right).to.not.equal(null);
        chai.expect(node.right.key).to.equal(5);
        chai.expect(node.height).to.equal(1);
        chai.expect(node.balanceFactor).to.equal(0);
    });

});

describe('AVL Tree', () => {
    it('root should be empty', () => {
        let tree = new AVLTree();

        chai.expect(tree.root).to.equal(null);
    });

    describe('AVL Tree insertion', () => {
        let tree = new AVLTree();

        it('AVL Tree invariants', () => {
            tree.insertKey(3);
            checkBinaryTreeOrderInvariant(tree.root);
            checkAVLTreeInvariant(tree.root);
            tree.insertKey(5);
            checkBinaryTreeOrderInvariant(tree.root);
            checkAVLTreeInvariant(tree.root);
            tree.insertKey(2);
            checkBinaryTreeOrderInvariant(tree.root);
            checkAVLTreeInvariant(tree.root);
            tree.insertKey(1);
            checkBinaryTreeOrderInvariant(tree.root);
            checkAVLTreeInvariant(tree.root);
        });
    });

    describe('AVL Tree search', () => {
        let tree = new AVLTree();
        it("search should return node with searched key", () => {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
            chai.expect(tree.searchKey(3).key).to.equal(3);
            chai.expect(tree.searchKey(5).key).to.equal(5);
            chai.expect(tree.searchKey(2).key).to.equal(2);
            chai.expect(tree.searchKey(1).key).to.equal(1);
            chai.expect(tree.searchKey(7)).to.equal(null);
        });
    });

    describe('AVL Tree delete', () => {
        let tree = new AVLTree();
        it("delete should delete node with key from tree", () => {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
            tree.deleteKey(3);
            checkBinaryTreeOrderInvariant(this.root);
            checkAVLTreeInvariant(tree.root);
            chai.expect(tree.searchKey(3)).to.equal(null);
            tree.deleteKey(5);
            checkBinaryTreeOrderInvariant(this.root);
            checkAVLTreeInvariant(tree.root);
            chai.expect(tree.searchKey(5)).to.equal(null);
            tree.deleteKey(2);
            checkBinaryTreeOrderInvariant(this.root);
            checkAVLTreeInvariant(tree.root);
            chai.expect(tree.searchKey(2)).to.equal(null);
            tree.deleteKey(1);
            checkBinaryTreeOrderInvariant(this.root);
            checkAVLTreeInvariant(tree.root);
            chai.expect(tree.searchKey(1)).to.equal(null);
        });
    });
});

describe('Binary Tree Iterator', () => {
});