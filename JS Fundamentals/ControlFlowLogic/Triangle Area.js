function triangleArea(a, b, c) {
    let sp = (a + b + c) / 2;
    return Math.sqrt(sp * (sp - a) * (sp - b) * (sp - c)).toFixed(10);
}

console.log(triangleArea(2, 3.5, 4));