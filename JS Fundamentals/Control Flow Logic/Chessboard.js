function chessboard(num) {
    console.log("<div class=\"chessboard\">");
    for (var row = 1; row <= num; row++) {
        let color = row % 2 === 0 ? "white" : "black";
        console.log("<div>");
        for (var column = 1; column <= num; column++) {
            if (column % 2 === 0) {
                console.log(`    <span class="${color}"></span>`);
            } else {
                console.log(`    <span class="${color}"></span>`);
            }
            color = (color == "white") ? "black" : "white";
        }
        console.log("</div>");
    }
    console.log("</div>");
}

chessboard(3);