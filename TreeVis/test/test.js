describe('Binary Search Node', function () {
    var node = new BinarySearchNode(3);

    it('root should be empty', function () {
        chai.expect((node.key)).to.equal(3);
        chai.expect((node.left)).to.equal(null);
        chai.expect((node.right)).to.equal(null);
    });
    it('left getter & setter', function () {
        node.left = new BinarySearchNode(2);
        chai.expect((node.key)).to.equal(3);
        chai.expect((node.left)).to.not.equal(null);
        chai.expect((node.left.key)).to.equal(2);
    });
    it('right getter & setter', function () {
        node.right = new BinarySearchNode(5);
        chai.expect((node.key)).to.equal(3);
        chai.expect((node.right)).to.not.equal(null);
        chai.expect((node.right.key)).to.equal(5);
    });
});

describe('Binary Search Tree', function () {
    var tree = new BinarySearchTree();
    it('root should be empty', function () {
        chai.expect(tree.root).to.equal(null);
    });

    describe('Binary Search Tree insertion', function () {
        it('Binary Search Tree invariant', function () {
            tree.insertKey(3);
            checkInvariant(tree.root);
            tree.insertKey(5);
            checkInvariant(tree.root);
            tree.insertKey(2);
            checkInvariant(tree.root);
            tree.insertKey(1);
            checkInvariant(tree.root);
        });
    });

    describe('Binary Search Tree search', function () {
        before(function () {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
        });
        it("search should return node with searched key", function () {
            chai.expect(tree.searchKey(3).key).to.equal(3);
            chai.expect(tree.searchKey(5).key).to.equal(5);
            chai.expect(tree.searchKey(2).key).to.equal(2);
            chai.expect(tree.searchKey(1).key).to.equal(1);
            chai.expect(tree.searchKey(7)).to.equal(null);
        });
    });

    describe('Binary Search Tree delete', function () {
        before(function () {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
        });
        it("delete should delete node with key from tree", function () {
            tree.deleteKey(3);
            checkInvariant(this.root);
            chai.expect(tree.searchKey(3)).to.equal(null);
            tree.deleteKey(5);
            checkInvariant(this.root);
            chai.expect(tree.searchKey(5)).to.equal(null);
            tree.deleteKey(2);
            checkInvariant(this.root);
            chai.expect(tree.searchKey(2)).to.equal(null);
            tree.deleteKey(1);
            checkInvariant(this.root);
            chai.expect(tree.searchKey(1)).to.equal(null);
        });
    });
});

var checkInvariant = function (node) {
    if (node.left) {
        chai.assert(node.key > node.left.key);
        checkInvariant(node.left);
    }
    if (node.right) {
        chai.assert(node.key < node.right.key);
        checkInvariant(node.right);
    }
};