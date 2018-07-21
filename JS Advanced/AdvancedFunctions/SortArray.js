function sortingArray(array, order) {
    if (order === 'desc') {
        array = array.sort((a, b) => {
            return b-a;
        })
    } else {
        array = array.sort((a, b) => {
            return a-b;
        })
    }
    return array;
}

sortingArray([14, 7, 17, 6, 8], 'desc');
sortingArray([2, 17, 90, 100, 1], 'asc');