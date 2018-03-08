function palindrome(word) {
    result = word.split('').reverse().join('');

    if (result === word) {
        return true;
    } else {
        return false;
    }
}

console.log(palindrome('racecar'));