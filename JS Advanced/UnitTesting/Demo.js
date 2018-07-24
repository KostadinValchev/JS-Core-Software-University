function sortNums(arr) {
    arr.sort((a, b) => a - b);
}

let array = [10, 3, 5, 2, -1];
sortNums(array);
if(JSON.stringify(array) === '[-1,2,3,5,10]'){
    console.log('Test passed');
}else{
    console.log("Test failed");
}
