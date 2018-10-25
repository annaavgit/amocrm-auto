define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "График занятий";

        this.getPageHTML = function (entityId) {
            let contents = templates.getCardHTML("График занятий", "Страница с графиком занятий");

            return templates.getPageHTML(contents, entityId, this.pageTitle);
        };

        this.renderPage = function () {
            $('#page_holder').html(this.getPageHTML(''));
        }
    }
});