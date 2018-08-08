const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_ry0nRaHr7';
const APP_SECRET = 'bbf3e1238f7342dba70a7a7dfe8a300a';
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};
const BOOKS_PER_PAGE = 10;

function loginUser() {
    let username = $('#formLogin input[name="username"]').val();
    let password = $('#formLogin input[name="passwd"]').val();

    // POST -> BASE_URL + 'user/' + APP_KEY + '/login'
    $.ajax({
        method: "POST",
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: {username, password}
    })
        .then(function (res) {
            signInUser(res, "Login Successful!")
        })
        .catch(handleAjaxError)
}

function registerUser() {
    let username = $('#formRegister input[name="username"]').val();
    let password = $('#formRegister input[name="passwd"]').val();

    // POST -> BASE_URL + 'user/' + APP_KEY + '/'
    $.ajax({
        method: "POST",
        headers: AUTH_HEADERS,
        data: {username, password},
        url: BASE_URL + 'user/' + APP_KEY + '/'
    })
        .then(function (res) {
            signInUser(res, "Registration successful")
        })
        .catch(handleAjaxError)

}

function listBooks() {
    $.ajax({
        method: 'GET',
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
    })
        .then(function (res) {
            displayPaginationAndBooks(res.reverse());
        })
        .catch(handleAjaxError);
    // GET -> BASE_URL + 'appdata/' + APP_KEY + '/books'
}


function createBook() {
    let title = $('#formCreateBook input[name="title"]').val();
    let author = $('#formCreateBook input[name="author"]').val();
    let description = $('#formCreateBook textarea[name="description"]').val();

    // POST -> BASE_URL + 'appdata/' + APP_KEY + '/books'
    $.ajax({
        method: "POST",
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {title, author, description}
    }).then(function () {
        listBooks();
        showView('viewBooks');
        showInfo('Book created.');
    }).catch(handleAjaxError);
}

function deleteBook(book) {
    let id = book._id;
    // DELETE -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
    $.ajax({
        method: "DELETE",
        url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
    })
        .then(function () {
            listBooks();
            showInfo('Book deleted.')
        })
        .catch(handleAjaxError);
}

function loadBookForEdit(book) {
    $('#formEditBook input[name="id"]').val(book._id);
    $('#formEditBook input[name="title"]').val(book.title);
    $('#formEditBook input[name="author"]').val(book.author);
    $('#formEditBook textarea[name="description"]').val(book.description);

    showView('viewEditBook');
}

function editBook() {
    let id = $('#formEditBook input[name="id"]').val();
    let title = $('#formEditBook input[name="title"]').val();
    let author = $('#formEditBook input[name="author"]').val();
    let description = $('#formEditBook textarea[name="description"]').val();

    // PUT -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
    $.ajax({
        method: "PUT",
        url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + id,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        data: {title, author, description}
    }).then(function () {
        listBooks();
        showInfo('Book edited.');
    })
        .catch(handleAjaxError);
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('userId', userInfo._id);
}

function logoutUser() {
    //$.ajax({
    //    method: 'POST',
    //    url: BASE_URL + '/user/' + APP_KEY + '/_logout',
    //    headers: {Authorization: 'Kinvey' + sessionStorage.getItem('authToken')}
    //});
    sessionStorage.clear();
    showHomeView();
    showHideMenuLinks();
    $('#loggedInUser').empty();
    showInfo('Logout successful.');
}

function signInUser(res, message) {
    saveAuthInSession(res);
    showHideMenuLinks();
    showHomeView();
    $('#loggedInUser').text("Hello, " + res.username + "!");
    showInfo(message);
}

function displayPaginationAndBooks(books) {
    showView('viewBooks');
    let pagination = $('#pagination-demo');
    if (pagination.data("twbs-pagination")) {
        pagination.twbsPagination('destroy')
    }
    pagination.twbsPagination({
        totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
        visiblePages: 5,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            $('#books > table  tr').each((index, element) => {
                if (index > 0) {
                    $(element).remove();
                }
            });

            let startBook = (page - 1) * BOOKS_PER_PAGE;
            let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length);
            $(`a:contains(${page})`).addClass('active');
            for (let i = startBook; i < endBook; i++) {
                let tr = $(`<tr><td>${books[i].title}</td>` +
                    `<td>${books[i].author}</td>` +
                    `<td>${books[i].description}</td>`);
                $('#books > table').append(tr);


                if (books[i]._acl.creator === sessionStorage.getItem('userId')) {
                    let td = $('<td>');
                    let aDelete = $('<a href="#">[Delete]</a>').on('click', function () {
                        deleteBook(books[i]);
                    });
                    let aEdit = $('<a href="#">[Edit]</a>').on('click', function () {
                        loadBookForEdit(books[i]);
                    });

                    td.append(aDelete).append(aEdit);
                    tr.append(td);
                }
            }
        }
    })
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showError(errorMsg);
}