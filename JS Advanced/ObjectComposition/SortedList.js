function getSortedList() {
    return {
        list: [],
        size: 0,
        add: function (element) {
            this.list.push(element);
            this.size++;
            this.list.sort((a, b) => a - b);
        },
        remove: function (index) {
            if (index >= 0 && index < this.list.length) {
                this.list.splice(index, 1);
                this.size--;
            }
        },
        get: function (index) {
            if (index >= 0 && index < this.list.length) {
                return this.list[index];
            }
        }
    }
}

let sortedList = getSortedList();
console.log(`Start size :${sortedList.size}`);
sortedList.add(3);
sortedList.add(5);
sortedList.add(8);
sortedList.add(6);
sortedList.add(1);
console.log(`Sorted list: ${sortedList.list.toString()}`);
console.log(`Get index : ${sortedList.get(3)}`);
console.log(`List size: ${sortedList.size}`);