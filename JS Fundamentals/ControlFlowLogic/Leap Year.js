function leapYear(year) {
    if ((year % 4 === 0 && year % 100 != 0)
        || year % 400 === 0) {
        return console.log("yes");
    }
    console.log("no");
}

leapYear(1999);
leapYear(2000);
leapYear(1900);