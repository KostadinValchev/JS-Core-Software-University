let expect = require('chai').expect;

function createCalculator() {
    let value = 0;
    return {
        add: function (num) {
            value += Number(num);
        },
        subtract: function (num) {
            value -= Number(num);
        },
        get: function () {
            return value;
        }
    }
}

describe("Calculator function test", function () {
    //Arrange
    let calc;
    beforeEach(function () {
        calc = createCalculator();
    });
    describe("Add", function () {
        it('should return 0 after initialization', function () {
            //Act
            let result = calc.get();
            //Assert
            expect(result).to.be.equal(0);
        });
        it('should return 5 after add 5', function () {
            //Act
            calc.add(5);
            let result = calc.get();
            //Assert
            expect(result).to.be.equal(5);
        });
        it('should return 8 after add 5 and 3', function () {
            //Act
            calc.add(5);
            calc.add(3)
            let result = calc.get();
            //Assert
            expect(result).to.be.equal(8);
        });
        it('should return NaN after add string', function () {
            //Act
            calc.add("hello")
            let result = calc.get();
            //Assert
            expect(result).to.be.NaN;
        });
    });
    describe("Subtract", function () {
        it('should return -5 after subtract 3 and 2', function () {
            //Act
            calc.subtract(3);
            calc.subtract(2);
            let result = calc.get();
            //Assert
            expect(result).to.be.equal(-5);
        });
        it('should return NaN after add string', function () {
            //Act
            calc.add('hello');
            let result = calc.get();
            //Assert
            expect(result).to.be.NaN;
        });
    });
    describe("Subtract in combination with subtract", function () {
        it('should return 4.2 after add 5.3 and subtract 1.1', function () {
            //Act
            calc.add(5.3);
            calc.subtract(1.1);
            let result = Number(calc.get().toFixed(1));
            //Assert
            expect(result).to.be.equal(4.20);
        });
        it('should return 2 after add 10, subtract string 7, add string -2 and subtract -1', function () {
            //Act
            calc.add(10);
            calc.subtract('7');
            calc.add('-2');
            calc.subtract(-1);
            let result = calc.get();
            //Assert
            expect(result).to.be.equal(2);
        });
    })
});