function functionalCalculator(numberOne, numberTwo, operator) {

    switch (operator) {
        case '+':
            console.log(Number(numberOne) + Number(numberTwo));
            break
        case '-':
            console.log(numberOne - numberTwo);
        case '/':
            console.log(numberOne / numberTwo);
            break
        case '*':
            console.log(numberOne * numberTwo);
            break
    }
}

functionalCalculator(3, 3, '/');