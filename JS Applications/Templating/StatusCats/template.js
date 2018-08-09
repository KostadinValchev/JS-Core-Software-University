$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        const data = window.cats;
        const catHtml = await $.get('./templates/catsList.hbs');
        let catTemplate = Handlebars.compile(catHtml);
        let finalData = {cats: data};
        let resultHtml = catTemplate(finalData);
        $('#allCats').append(resultHtml);
        $('> div ')
        $(':button').on('click', function () {
            let cat = $(this).next();
            let display = cat.attr('style');
            if (display === 'display: none') {
                cat.attr('style', 'display: block;')
            } else {
                cat.hide();
            }
        });
    }
});

