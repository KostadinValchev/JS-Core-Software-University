function cone(r, h) {
    let l = Math.sqrt(r * r + h * h);
    let volume = Math.PI * r * r * h / 3;
    console.log(`volume = ${volume.toFixed(4)}`);
    let area = Math.PI * r * (r + l);
    console.log(`area = ${area.toFixed(4)}`);
}

cone(3, 5);
cone(3.3, 7.8);