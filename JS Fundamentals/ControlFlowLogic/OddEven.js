function oddEven(n) {
    if (n % 2 === 0) {
        console.log("even")
    }
    else if (Math.abs(n % 2) === 1) {
        console.log("odd");
    }
    else {
        console.log("invalid");
    }
}

oddEven(5);
oddEven(8);
oddEven(1.5);