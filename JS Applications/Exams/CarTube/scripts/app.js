$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('home', getWelcomePage);
        this.get('index.html', getWelcomePage);

        this.get('#/register', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/forms/registerForm.hbs');
            })
                .catch(notify.handleError)
        });

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;


            if (!/^[A-Za-z]{3,}$/.test(username)) {
                notify.showError('Username should be at least 3 characters long and contain only english alphabet letters');
            } else if (!/^[A-Za-z\d]{6,}$/.test(password)) {
                notify.showError('Password should be at least 6 characters long and contain only english alphabet letters');
            } else if (repeatPass !== password) {
                notify.showError('Passwords must match!');
            } else {
                auth.register(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        notify.showInfo('User registration successful!');
                        ctx.redirect('#/carList');
                    })
                    .catch(notify.handleError);
            }
        });

        this.get('#/login', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/forms/login.hbs');
                ctx.redirect('#/carList');
            })
                .catch(notify.handleError)
        });

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            if (username === '' || password === '') {
                notify.showError('All fields should be non-empty!');

            } else {
                auth.login(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        notify.showInfo('Login successful.');
                        ctx.redirect('#/cars');
                    })
                    .catch(notify.handleError);
            }
        });

        this.get('#/logout', (ctx) => {
            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    ctx.redirect('#/home');
                    notify.showInfo('Logout successful.');

                })
                .catch(notify.handleError);
        });

        this.get('#/create/cars', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/cars/createCar.hbs');
                ctx.redirect('#/carList');
            })
                .catch(notify.handleError)
        });

        this.post('#/create/cars', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            let author = sessionStorage.getItem('username');
            let title = ctx.params.title;
            let description = ctx.params.description;
            let brand = ctx.params.brand;
            let model = ctx.params.model;
            let year = ctx.params.year;
            let imageUrl = ctx.params.imageUrl;
            let fuelType = ctx.params.fuelType;
            let price = ctx.params.price;

            if (title === '') {
                notify.showError('Title is required!');
            } else {
                cars.createCar(author, title, description, brand, model, year, imageUrl, fuelType, price)
                    .then(() => {
                        notify.showInfo('Car created.');
                        ctx.redirect('#/carList');
                    })
                    .catch(notify.handleError);
            }
        });

        this.get('#/edit/cars/:carId', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            let carId = ctx.params.carId;

            cars.getCarById(carId)
                .then((car) => {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.carId = ctx.params.carId;
                    ctx.car = car;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                    }).then(function () {
                        this.partial('./templates/cars/editCar.hbs');
                    })
                })
        });

        this.post('#/edit/cars', (ctx) => {

            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }
            let carId = ctx.params.carId;
            let title = ctx.params.title;
            let description = ctx.params.description;
            let brand = ctx.params.brand;
            let model = ctx.params.model;
            let year = ctx.params.year;
            let imageUrl = ctx.params.imageUrl;
            let fuelType = ctx.params.fuelType;
            let price = ctx.params.price;
            if (title === '') {
                notify.showError('Title is required!');
            } else {
                cars.editCar(carId, title, description, brand, model, year, imageUrl, fuelType, price)
                    .then(function () {
                        notify.showInfo('Car edited.');
                        ctx.redirect('#/cars');
                    })
                    .catch(notify.handleError);
            }
        });

        this.get('#/cars', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            cars.getAllCars()
                .then((allCars) => {
                    allCars.forEach((p, i) => {
                        p.isAuthor = p._acl.creator === sessionStorage.getItem('userId');
                        p.carId = p._id;
                    });
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.cars = allCars;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        car: './templates/cars/car.hbs',
                    }).then(function (res) {
                        this.partial('./templates/cars/carList.hbs');
                    })
                })
                .catch(notify.handleError);

        });

        this.get('#/details/:carId', (ctx) => {

            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            let id = ctx.params.carId;
            console.log(id);

            cars.getCarById(id)
                .then((car) => {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.carId = car._id;
                    ctx.imageUrl = car.imageUrl;
                    ctx.brand = car.brand;
                    ctx.model = car.mode;
                    ctx.year = car.year;
                    ctx.fuelType = car.fuelType;
                    ctx.price = car.price;
                    ctx.description = car.description
                    console.log(car);
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                    }).then(function () {
                        this.partial('./templates/cars/carDetail.hbs');
                    })
                })
        });

        this.get('#/delete/cars/:carId', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            let carId = ctx.params.carId;

            cars.deleteCar(carId)
                .then(() => {
                    notify.showInfo('Car deleted.');
                    ctx.redirect('#/cars');
                })
                .catch(notify.handleError);
        });

        this.get('#/cars/:username', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }
            let username = sessionStorage.getItem('username');
            console.log(username);
            cars.getMyCars(username)
                .then((allCars) => {
                    console.log(allCars);
                    allCars.forEach((p, i) => {
                        p.isAuthor = p._acl.creator === sessionStorage.getItem('userId');
                        p.carId = p._id;
                    });
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.cars = allCars;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        car: './templates/cars/car.hbs',
                    }).then(function () {
                        this.partial('./templates/cars/myCars.hbs');
                    })
                })
                .catch(notify.handleError);

        });




        function getWelcomePage(ctx) {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/welcome-anonymous.hbs');
            });
        }
    });
    app.run();
});