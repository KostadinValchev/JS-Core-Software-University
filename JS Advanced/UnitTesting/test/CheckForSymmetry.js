const expect = require('chai').expect;

function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

describe("Is Symmetric function test", function () {
    describe("True tests", function () {
        it('should return true for [1,2,3,2,1]', function () {
            //Arrange
            let array = [1, 2, 3, 2, 1];
            //Act
            let result = isSymmetric(array);
            //Assert
            expect(result).to.be.equal(true);
        });
        it('should return true for [-1,2,-1]', function () {
            //Arrange
            let array = [-1, 2, -1];
            //Act
            let result = isSymmetric(array);
            //Assert
            expect(result).to.be.equal(true);
        });
        it('should return true for [1]', function () {
            //Arrange
            let array = [1];
            //Act
            let result = isSymmetric(array);
            //Assert
            expect(result).to.be.equal(true);
        });
        it('should return true for [5,\'hi\',{a:5},new Date(),{a:5},\'hi\',5]', function () {
            //Arrange
            let array = [5, 'hi', {a: 5}, new Date(), {a: 5}, 'hi', 5];
            //Act
            let result = isSymmetric(array);
            //Assert
            expect(result).to.be.equal(true);
        });
    })
    describe("False tests", function () {
        it('should return false for [1,2,3,4,2,1]', function () {
            //Arrange
            let array = [1,2,3,4,2,1];
            //Act
            let result = isSymmetric(array);
            //Assert
            expect(result).to.be.equal(false);
        });
        it('should return false for [-1,2,1]', function () {
            //Arrange
            let array = [-1,2,1];
            //Act
            let result = isSymmetric(array);
            //Assert
            expect(result).to.be.equal(false);
        });
        it('should return false for [1,2]', function () {
            //Arrange
            let array = [1,2];
            //Act
            let result = isSymmetric(array);
            //Assert
            expect(result).to.be.equal(false);
        });
        it('should return false for [5,\'hi\',{a:5},new Date(),{X:5},\'hi\',5]', function () {
            //Arrange
            let array = [5,'hi',{a:5},new Date(),{X:5},'hi',5];
            //Act
            let result = isSymmetric(array);
            //Assert
            expect(result).to.be.equal(false);
        });
        it('should return false for string', function () {
            //Arrange
            let str = "1,2,2,1";
            //Act
            let result = isSymmetric(str);
            //Assert
            expect(result).to.be.equal(false);
        });
    })
});