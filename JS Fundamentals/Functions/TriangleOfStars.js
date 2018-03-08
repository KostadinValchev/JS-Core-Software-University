function triangleOfStars(count) {
    let star = '*';
    let starCount = Number(1);
    for (let i = 1; i < count; i++) {
        console.log(star.repeat(starCount));
        starCount++;
    }

    for (let j = count; j >= 1; j--) {
        console.log(star.repeat(starCount));
        starCount--;
    }
}

triangleOfStars(5);