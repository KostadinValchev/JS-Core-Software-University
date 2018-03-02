function figure(n) {
    let lines = n % 2 === 0 ? n -1 : n;
    let result = "";
    let midRows = (lines - 3) / 2;
    for (let r = 1; r <= 2; r++) {
        let c = (((2*n)-1) - 3) / 2;
        result += `+${"-".repeat(c)}+${"-".repeat(c)}+\n`;
        for (let l = 0; l < midRows; l++) {
            result += `|${" ".repeat(c)}|${" ".repeat(c)}|\n`;
        }
        if (r == 2) {
            result += `+${"-".repeat(c)}+${"-".repeat(c)}+`;
        }
    }
    console.log(result);
}

figure(4);
figure(5);
figure(7);