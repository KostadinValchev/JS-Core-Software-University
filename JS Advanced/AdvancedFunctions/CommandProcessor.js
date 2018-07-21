function  solve(arr) {
   let commandProcessor =( function () {
    let result = '';
       return {
           'append': (str)=> {result += str},
           'removeStart': (num) => {result += result.substring(num)},
           'removeEnd': (num) => {result +=
               result.substring(0, result.length - 1 -num)},
           'print': () => {console.log(result)}
       }
    }());
    for (let comm of arr) {
        let [command, item] = comm.split(' ');
        commandProcessor[command](item);
    }
}

solve([]);