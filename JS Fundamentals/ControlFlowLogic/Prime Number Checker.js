function isPrime(num) {
    let prime = true;
    for (var i = 2; i < Math.sqrt(num); i++) {
        if (num % i == 0) {
            prime = false;
            break;
        }
    }
    return prime && num > 1;
}

console.log(isPrime(7));
console.log(isPrime(8));
console.log(isPrime(51));
