function biggest(args) {
    let first = args[0],
        second = args[1],
        third = args[2]
    console.log(Math.max(first, second, third))
}

biggest([5, -2, 7]);
biggest([130, 5, 29]);
biggest([130, 5, 29]);
biggest([43, 43.1, 43.2]);
biggest([5, 5, 5]);
biggest([-10, -20, -30]);