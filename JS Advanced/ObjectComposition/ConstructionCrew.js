function modifyWorker(worker) {
    let handsShaking = worker.handsShaking;
    if (handsShaking === true) {
        worker.bloodAlcoholLevel = worker.weight * worker.experience * 0.1;
        worker.handsShaking = false;
    }

    return worker;
}

console.log(modifyWorker({
    weight: 80,
    experience: 1,
    bloodAlcoholLevel: 0,
    handsShaking: true
}));