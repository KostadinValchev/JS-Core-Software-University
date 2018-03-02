function round([number, precision]) {
    if (precision > 15) {
        precision = 15;
    }
    let multiplier = Math.pow(10, precision);
    return Math.round(number * multiplier) / multiplier;
}

console.log(round([3.1415926535897932384626433832795, 2]));
console.log(round([10.5, 3]));