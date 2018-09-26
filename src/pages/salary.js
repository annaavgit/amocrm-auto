define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "Зарплаты инструкторов";

        this.getPageHTML = function (entityId) {
            let contents = "<iframe src=\"//amohelper.ru/client/aleks_shubin/zarplata/index.php?t=0.9802936133748856&lang=ru&currency=RUB&period=week\" width='100%' height='700px'>" +
                "</iframe>";

            return templates.getPageHTML(contents, entityId, this.pageTitle);
        };
    }
});