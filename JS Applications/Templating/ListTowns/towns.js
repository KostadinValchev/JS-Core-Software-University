function attachEvents() {
    $('#btnLoadTowns').on('click', function () {
        let towns = $('#towns').val().split(', ').map(e=>({name:e}));
        const townHtml = $('#towns-template').html();
        let townTemplate = Handlebars.compile(townHtml);
        let finalData = {towns: towns};
        let resultHtml = townTemplate(finalData);
        $('#root').empty();
        $('#root').append(resultHtml);
    })
}
