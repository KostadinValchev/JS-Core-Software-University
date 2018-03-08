function squareOfStars(arg) {
    let star = '* ';
    let starCount = arg;
    if (arg === undefined || arg.isNull || arg < 0) {
        for (var i = 1; i <= 5; i++) {
            console.log(star.repeat(5));
        }
    } else {
        for (var i = 1; i <= arg; i++) {
            console.log(star.repeat(arg));
        }
    }
}

squareOfStars(5);