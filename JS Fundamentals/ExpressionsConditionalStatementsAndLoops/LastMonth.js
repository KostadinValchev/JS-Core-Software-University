function lastMonthDays(date) {
    let day = date[0];
    let month = date[1];
    let year = date[2];

    let newDate = new Date(year, month - 1, 0);
    return daysCount = newDate.getDate();
}

console.log(lastMonthDays([17, 3, 2002]));
console.log(lastMonthDays([13, 12, 2004]));