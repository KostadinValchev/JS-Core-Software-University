function solution(initialCar) {
    let wheel;
    let engines = [
        {power: 90, volume: 1800},
        {power: 120, volume: 2400},
        {power: 200, volume: 3500}
    ];

    initialCar.wheelsize % 2 === 0 ? wheel = fillingArr(initialCar.wheelsize - 1) : wheel = fillingArr(initialCar.wheelsize);

    let result = {
            model: initialCar.model,
            engine: engines.find(e => e.power === initialCar.power) || engines.find(e => e.power > initialCar.power),
            carriage: {
                type: initialCar.carriage,
                color:
                initialCar.color
            }
            ,
            wheels: wheel
        }
    ;

    return result;

    function fillingArr(number) {
        let arr = [];
        let count = 4;
        while (count !== 0) {
            arr.push(number);
            count--;
        }
        return arr;
    }
}

console.log(solution({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));


console.log(solution({
    model: 'Brichka',
    power: 65,
    color: 'white',
    carriage: 'hatchback',
    wheelsize: 16
}));