function sum(a, b) {
    return a + b;
}

describe('sum', function () {
    it('should return sum of arguments', function () {
        chai.expect(sum(1, 2)).to.equal(3);
    });
});

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
        beforeEach(function () {
            tree.insertKey(3);
        });
        it('root should not be empty', function () {

            chai.expect(tree.root).to.not.equal(null);
            chai.expect(tree.root.key).to.equal(3);
            chai.expect(tree.root.left).to.equal(null);
            chai.expect(tree.root.right).to.equal(null);
        });


        it('insertion should be correct', function () {

            before(function () {
                tree.insertKey(2);

            });

            it('if key is less should insert left', function () {
                chai.expect(tree.root.key).to.equal(3);

                chai.expect(tree.root.left).to.not.equal(null);
                chai.expect(tree.root.right.key).to.equal(2);
                chai.expect(tree.root.right).to.equal(null);
            });
            before(function () {
                tree.insertKey(5);

            });
            it('if key is less should insert left',function () {

                chai.expect(tree.root.key).to.equal(3);

                chai.expect(tree.root.right).to.not.equal(null);
                chai.expect(tree.root.right.key).to.equal(5);
            });
        });
    });

    describe('Binary Search Tree search', function () {
        before(function () {
            tree.insertKey(3);
            tree.insertKey(5);
            tree.insertKey(2);
            tree.insertKey(1);
        });
        it("Search should return node with searched key",function () {
            chai.expect(tree.searchKey(3).key).to.equal(3);
            chai.expect(tree.searchKey(5).key).to.equal(5);
            chai.expect(tree.searchKey(2).key).to.equal(2);
            chai.expect(tree.searchKey(1).key).to.equal(1);
            chai.expect(tree.searchKey(7)).to.equal(null);
        });
    });
});