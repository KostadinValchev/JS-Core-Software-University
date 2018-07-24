function subSum(arr, start, end) {
    if (!Array.isArray(arr)) {
        return NaN;
    }
    start = start < 0 ? 0 : start;
    end = end > arr.length - 1 ? arr.length - 1 : end;

    let sum = 0;
    for (var i = start; i <= end; i++) {
        sum += Number(arr[i]);

    }
    return sum;
}

console.log(subSum([10, 20, 30, 40, 50, 60], 3, 300));
console.log(subSum([], 1, 2));
console.log(subSum('text', 0, 2));