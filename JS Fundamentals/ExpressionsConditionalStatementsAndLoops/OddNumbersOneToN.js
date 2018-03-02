function oddNumbers(n) {
    for (let i = 0; i <= n; i++) {
        if (i % 2 !== 0) {
            console.log(i);
        }
    }
}

oddNumbers(5);
console.log('-'.repeat(2));
oddNumbers(7);