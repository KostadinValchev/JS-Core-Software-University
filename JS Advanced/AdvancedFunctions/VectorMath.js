let solution = (function () {
    function add(vector1, vector2) {
        return [(vector1[0] + vector2[0]), (vector1[1] + vector2[1])];
    }

    function multiply(vector1, scalar) {
        return [vector1[0] * scalar, vector1[1] * scalar];
    }

    function lenght(vector1) {
        return Math.sqrt(vector1[0] * vector1[0] + vector1[1] * vector1[1]);
    }

    function dot(vector1, vector2) {
        return vector1[0] * vector2[0] + vector1[1] * vector2[1];
    }

    function cross(vector1, vector2) {
        return vector1[0] * vector2[1] - vector1[1] * vector2[0];
    }

    return {
        add: add,
        multiply: multiply,
        length: lenght,
        dot: dot,
        cross: cross
    }
})();

console.log(solution.add([1, 1], [1, 0]));
console.log(solution.multiply([3.5, -2], 2));
console.log(solution.length([3, -4]));
console.log(solution.dot([1, 0], [0, -1]));
console.log(solution.cross([3, 7], [1, 0]));