function fruitOrVegetable(argument) {
    if (argument === "banana" ||
        argument === "apple" ||
        argument === "kiwi" ||
        argument === "cherry" ||
        argument === "lemon" ||
        argument === "grapes" ||
        argument === "peach") {
        console.log("fruit");
    }
    else if (argument === "tomato" ||
        argument === "cucumber" ||
        argument === "pepper" ||
        argument === "onion" ||
        argument === "garlic" ||
        argument === "parsley") {
        console.log("vegetable");
    }
    else {
        console.log("unknown");
    }
}

fruitOrVegetable('banana');
fruitOrVegetable('cucumber');
fruitOrVegetable('pizza');