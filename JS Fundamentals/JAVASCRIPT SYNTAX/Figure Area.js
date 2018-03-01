function figure(w, h, W, H) {
    let result = [s1, s2, s3] = [
        w * h,
        W * H,
        Math.min(w, W) * Math.min(h, H)];
    return s1 + s2 - s3;
}

console.log(figure(2, 4, 5, 3))
console.log('-'.repeat(5))
console.log(figure(13, 2, 5, 8))