let contacts = [
    {
        "firstName": "Ivan",
        "lastName": "Ivanov",
        "phone": "0888 123 456",
        "email": "i.ivanov@gmail.com"
    },
    {
        "firstName": "Jordan",
        "lastName": "Kirov",
        "phone": "0988 456 789",
        "email": "jordk@gmail.com"
    },
    {
        "firstName": "Maria",
        "lastName": "Petrova",
        "phone": "0899 987 654",
        "email": "mar4eto@abv.bg"
    },
    {
        "firstName": "Sterling",
        "lastName": "Archer",
        "phone": "0123 123 123",
        "email": "archer@misix.com"
    },
    {
        "firstName": "Lana",
        "lastName": "Kane",
        "phone": "0123 423 873",
        "email": "lana@misix.com"
    },
    {
        "firstName": "Cyril",
        "lastName": "Figgis",
        "phone": "0123 176 679",
        "email": "cyril@misix.com"
    },
    {
        "firstName": "Cheryl",
        "lastName": "Tunt",
        "phone": "0123 277 380",
        "email": "cheryl@misix.com"
    },
    {
        "firstName": "Pam",
        "lastName": "Poovey",
        "phone": "0123 070 768",
        "email": "pam@misix.com"
    },
    {
        "firstName": "Malory",
        "lastName": "Archer",
        "phone": "0123 999 999",
        "email": "malory@misix.com"
    }
]

function changeContent(contact) {
    console.log(contact);
}

$(() => {


    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/login', function() {
            this.partial('./templates/login.hbs');
        });

        this.post('#/login', function(context) {
            kinveyController.loginUser(
                context.params.username,
                context.params.password);
            this.redirect('#/profile');
        });

        this.get('#/register', function() {
            this.partial('./templates/register.hbs');
        });

        this.post('#/register', function(context) {
            kinveyController.registerUser(
                context.params.username,
                context.params.password,
                context.params.firstName,
                context.params.lastName,
                context.params.phone,
                context.params.email);
            this.redirect('#/profile');
        });

        this.get('#/contacts/:userId', function(ctx) {
            this.contacts = contacts;
            this.currentContact = contacts[ctx.params.userId];
            this.loadPartials({
                details: './templates/partials/details.hbs',
            }).then(function(context) {
                this.partial('./templates/contacts.hbs');
            });
        });

        this.get('#/profile', function() {
            this.firstName = sessionStorage.getItem("firstName");
            this.lastName = sessionStorage.getItem("lastName");
            this.phone = sessionStorage.getItem("phone");
            this.email = sessionStorage.getItem("email");
            this.partial('./templates/profile.hbs');
        });

        this.put('#/profile', function(context) {
            kinveyController.editUser(
                context.params.firstName,
                context.params.lastName,
                context.params.phone,
                context.params.email)
        });
    });
    app.run()
});