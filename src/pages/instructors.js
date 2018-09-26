define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "Инструкторы";

        this.getPageHTML = function (entityId) {
            let contents = templates.getCardHTML("Инструкторы", "Страница со списком инструкторов");

            return templates.getPageHTML(contents, entityId, this.pageTitle);
        };
    }
});