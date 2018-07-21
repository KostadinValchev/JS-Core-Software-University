function argumentInfo() {
    let typeCount = new Map;
    for (let argument of arguments) {
        let type = typeof(argument);
        if (!typeCount.has(type)) {
            typeCount.set(type, 0);
        }
        let oldValue = typeCount.get(type);
        typeCount.set(type, oldValue + 1);
        console.log(`${type}: ${argument}`)
    }
    typeCount = [...typeCount].sort((a, b) => b[1] - a[1]);
    for (let element of typeCount) {
        console.log(element[0] + " = " + element[1])
    }
}


argumentInfo(42, 'cat', 15, 'kitten', 'tomcat');