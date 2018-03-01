function sumAndVat(args) {
    let sum = 0
    let vat = 0

    for (let i = 0; i < args.length ; i++) {
        sum += args[i]
    }
    vat = sum * 0.2
    console.log(`Sum = ${sum}`)
    console.log(`Vat = ${vat}`)
    console.log(`Sum = ${sum + vat}`)
}

let firstInput = [1.20,2.60,3.50]
let secondInput = [3.12, 5, 18, 19.24, 1953.2262, 0.001564, 1.1445]
sumAndVat(firstInput)
console.log(`-`.repeat(20))
sumAndVat(secondInput)