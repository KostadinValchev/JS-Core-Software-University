let cars = (() => {
    function createCar(seller, title, description, brand, model, year, imageUrl, fuel, price) {
        let data =
            {
                seller,
                title,
                description,
                brand,
                model,
                year,
                imageUrl,
                fuel,
                price
            };

        return remote.post('appdata', 'cars', 'kinvey', data);
    }

    function getAllCars() {
        const endpoint = 'cars?query={}&sort={"_kmd.ect": -1}';

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function getCarById(carId) {
        const endpoint = `cars/${carId}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function editCar(carId, title, description, brand, model, year, imageUrl, fuelType, price) {
        const endpoint = `cars/${carId}`;
        let data = {title, description, brand, model, year, imageUrl, fuelType, price};

        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function deleteCar(carId) {
        const endpoint = `cars/${carId}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }
    function getMyCars(username) {
        const endpoint = `cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {
        createCar,
        getAllCars,
        getCarById,
        editCar,
        deleteCar,
        getMyCars
    }
})();


