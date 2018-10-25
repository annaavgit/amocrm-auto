define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "Преподаватели";

        this.getPageHTML = function (entityId) {
            let contents = templates.getCardHTML("Преподаватели", "Страница со списком преподавателей");

            return templates.getPageHTML(contents, entityId, this.pageTitle);
        };

        this.renderPage = function () {
            $('#page_holder').html(this.getPageHTML(''));
        }
    }
});