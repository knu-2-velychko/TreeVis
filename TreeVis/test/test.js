function sum(a, b) {
    return a + b;
}

describe('sum', function () {
    it('should return sum of arguments', function () {
        chai.expect(sum(1, 2)).to.equal(3);
    });
});

describe('Binary Search Tree', function () {
    var tree = new BinarySearchTree();
    it('root should be empty', function () {
        chai.expect((tree.getRoot)).to.equal(null);
    });
});