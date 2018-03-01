function filterByAge(minAge, nameA, ageA, nameB, ageB) {
    let personA = {name: nameA, age: ageA};
    let personB = {name: nameB, age: ageB};
    if (personA.age >= minAge)
        console.log(personA);
    if (personB.age >= minAge)
        console.log(personB);
}

filterByAge(12, 'Ivan', 15, 'Asen', 9)