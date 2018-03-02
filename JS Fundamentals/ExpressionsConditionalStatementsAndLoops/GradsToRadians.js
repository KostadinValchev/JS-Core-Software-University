function gradsToDegrees(grad) {
    grad = grad % 400;
    let degree = grad * 0.9;
    return degreeOutput = degree < 0 ? 360 + degree : degree;
}

console.log(gradsToDegrees(100));
console.log(gradsToDegrees(400));
console.log(gradsToDegrees(850));
console.log(gradsToDegrees(-50));