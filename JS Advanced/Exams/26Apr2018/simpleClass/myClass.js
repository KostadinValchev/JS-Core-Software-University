class LineManager {
    constructor(busStops) {
        this.busStops = busStops;
        this.currentStop = 0;
        this.delay = 0;
        this.totalDuration = 0;
    }

    get atDepot() {
        return this.currentStop === this._busStops.length - 1;
    }

    get nextStopName() {
        if (this.atDepot) {
            return 'At depot.';
        }
        return this._busStops[this.currentStop + 1].name;
    }

    get currentDelay() {
        return this.delay;
    }

    set busStops(value) {
        for (let i = 0; i < value.length; i++) {
            if (typeof value[i].name !== 'string' || typeof value[i].timeToNext !== 'number' ||
                value[i].name === '' || value[i].timeToNext < 0) {
                throw new Error('Invalid data');
            }
        }
        this._busStops = value;
    }

    arriveAtStop(minutes) {
        if (minutes < 0 || this.atDepot) {
            throw new Error('');
        }
        this.totalDuration += minutes;
        this.delay += minutes - this._busStops[this.currentStop].timeToNext;
        this.currentStop++;
        return !this.atDepot;
    }

    toString() {
        let line = this.atDepot ? '- Course completed\n' : `- Next stop: ${this._busStops[this.currentStop + 1].name}\n`;
        return 'Line summary\n' +
            line +
            `- Stops covered: ${this.currentStop}\n` +
            `- Time on course: ${this.totalDuration} minutes\n` +
            `- Delay: ${this.delay} minutes`;
    }
}

// Initialize a line manager with correct values
const man = new LineManager([
    {name: 'Depot', timeToNext: 4},
    {name: 'Romanian Embassy', timeToNext: 2},
    {name: 'TV Tower', timeToNext: 3},
    {name: 'Interpred', timeToNext: 4},
    {name: 'Dianabad', timeToNext: 2},
    {name: 'Depot', timeToNext: 0},
]);

// Travel through all the stops until the bus is at depot
while(man.atDepot === false) {
    console.log(man.toString());
    man.arriveAtStop(4);
}

console.log(man.toString());


const wrong = new LineManager([
    { name: 'Stop', timeToNext: { wrong: 'Should be a number'} }
]);

