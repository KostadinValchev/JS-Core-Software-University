function numbers(n) {
    let str = '';
    for (let i = 1; i <= n; i++) {
        str += i;
    }
    return str;
}

let input = '11'

console.log(numbers(input))