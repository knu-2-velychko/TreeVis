function sum(a, b) {
    return a + b;
}

describe('sum', function () {
    it('should return sum of arguments', function () {
        chai.expect(sum(1, 2)).to.equal(3);
    });
});