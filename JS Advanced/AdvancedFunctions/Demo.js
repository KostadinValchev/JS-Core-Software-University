let person = {
    name: "Stamat",
    printName: function () {
        console.log(this.name);
    }
};

person.printName();

let alien = {name: "Nikola"};

person.printName.call(alien);