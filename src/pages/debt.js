define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "Должники";

        this.getPageHTML = function (entityId) {
            let contents = templates.getCardHTML("Должники", "Страница со списком должников");

            return templates.getPageHTML(contents, entityId, this.pageTitle);
        };

        this.renderPage = function () {
            $('#page_holder').html(this.getPageHTML(''));
        }
    }
});