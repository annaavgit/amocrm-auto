define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "Напоминания";

        this.getPageHTML = function (entityId) {
            let contents = templates.getCardHTML("Напоминания", "Страница с напоминаниями об истечении сроков документов");

            return templates.getPageHTML(contents, entityId, this.pageTitle);
        };
    }
});