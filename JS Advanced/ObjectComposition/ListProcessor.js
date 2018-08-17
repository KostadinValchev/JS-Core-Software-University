//"Revealing Module" Pattern
function solution(arr) {
    let commandExecutor = (function () {
        let resultArr = [];

        function add(str) {
            resultArr.push(str);
        }

        function remove(str) {
            resultArr = resultArr.filter(el => el !== str);
        }

        function print() {
            console.log(resultArr.join(','));
        }

        return {add, remove, print}
    }());

    for (let element of arr) {
        let [command, value] = element.split(' ');
        commandExecutor[command](value);
    }
}

solution(['add hello', 'add again', 'remove hello', 'add again', 'print']);