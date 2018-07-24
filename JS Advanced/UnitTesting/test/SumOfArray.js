const expect = require('chai').expect;

function sum(arr) {
    let sum = 0;
    for (let num of arr)
        sum += Number(num);
    return sum;
}

describe("Sum function tests", function () {
    it("should return 6 for [1,2,3]", function () {
        //Arrange
        let array = [1, 2, 3];
        //Act
        let result = sum(array);
        //Assert
        expect(result).to.be.equal(6);
    });
    it('should return 0 for []', function () {
        //Arrange
        let array = [];
        //Act
        let result = sum(array);
        //Assert
        expect(result).to.be.equal(0);
    });
    it('should be return 1 for [1]', function () {
        //Arrange
        let array = [1];
        //Act
        let result = sum(array);
        //Assert
        expect(result).to.be.equal(1);
    });
    it('should be return 3 for [1.5,2.5,-1]', function () {
        //Arrange
        let array = [1.5, 2.5, -1];
        //Act
        let result = sum(array);
        //Assert
        expect(result).to.be.equal(3);
    });
    it('should be return NaN for string', function () {
        //Arrange
        let array = "invalid data";
        //Act
        let result = sum(array);
        //Assert
        expect(result).to.be.NaN
    });
});