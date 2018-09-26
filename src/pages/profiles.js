define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "Личные данные инструкторов";

        this.getPageHTML = function (entityId) {
            let contents = templates.getCardHTML("Личные данные инструкторов", "Страница с информацией о сотрудниках и их документами");

            return templates.getPageHTML(contents, entityId, this.pageTitle);
        };
    }
});