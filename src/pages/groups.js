define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "Группы";

        this.getPageHTML = function (entityId) {
            let tabs = ["Группа 1", "Группа 2", "Группа 3"];
            let header = [
                {title: "ФИО инструктора", width: "30%", dataType: "name"},
                {title: "Регион 1", width: "35%", dataType: "custom"},
                {title: "Регион 2", width: "35%", dataType: "custom"}
            ];

            let rows = [
                [{contents: "Комягина Тамара Георгиевна", dataType: "name"}, {
                    contents: "40%",
                    dataType: "custom"
                }, {contents: "20%", dataType: "custom"}],
                [{contents: "Пелёвина Анна Владиленовна", dataType: "name"}, {
                    contents: "22%",
                    dataType: "custom"
                }, {contents: "74%", dataType: "custom"}],
                [{contents: "Лагутин Сергей Аполлинариевич", dataType: "name"}, {
                    contents: "100%",
                    dataType: "custom"
                }, {contents: "100%", dataType: "custom"}],
                [{contents: "Щукин Григорий Венедиктович", dataType: "name"}, {
                    contents: "54%",
                    dataType: "custom"
                }, {contents: "12%", dataType: "custom"}],
                [{contents: "Ягеман Моисей Назарович", dataType: "name"}, {
                    contents: "63%",
                    dataType: "custom"
                }, {contents: "51%", dataType: "custom"}],
                [{contents: "Бубнов Захар Титович", dataType: "name"}, {
                    contents: "40%",
                    dataType: "custom"
                }, {contents: "20%", dataType: "custom"}],
                [{contents: "Пономарева Элеонора Ростиславовна", dataType: "name"}, {
                    contents: "22%",
                    dataType: "custom"
                }, {contents: "74%", dataType: "custom"}],
                [{contents: "Арцишевский Мир Геннадиевич", dataType: "name"}, {
                    contents: "100%",
                    dataType: "custom"
                }, {contents: "100%", dataType: "custom"}],
                [{contents: "Палванова Регина Родионовна", dataType: "name"}, {
                    contents: "54%",
                    dataType: "custom"
                }, {contents: "12%", dataType: "custom"}],
                [{contents: "Колбягина Берта Петровна", dataType: "name"}, {
                    contents: "63%",
                    dataType: "custom"
                }, {contents: "51%", dataType: "custom"}],
                [{contents: "Истлентьева Кристина Давидовна", dataType: "name"}, {
                    contents: "40%",
                    dataType: "custom"
                }, {contents: "20%", dataType: "custom"}],
                [{contents: "Нагиева Алла Романовна", dataType: "name"}, {
                    contents: "22%",
                    dataType: "custom"
                }, {contents: "74%", dataType: "custom"}],
                [{contents: "Кахадзе Мир Наумович", dataType: "name"}, {
                    contents: "100%",
                    dataType: "custom"
                }, {contents: "100%", dataType: "custom"}],
                [{contents: "Канаша Аза Карповна", dataType: "name"}, {
                    contents: "54%",
                    dataType: "custom"
                }, {contents: "12%", dataType: "custom"}],
                [{contents: "Державина Христина Юлиевна", dataType: "name"}, {
                    contents: "63%",
                    dataType: "custom"
                }, {contents: "51%", dataType: "custom"}],
                [{contents: "Сарнычева Инга Тимуровна", dataType: "name"}, {
                    contents: "40%",
                    dataType: "custom"
                }, {contents: "20%", dataType: "custom"}],
                [{contents: "Решетов Данила Куприянович", dataType: "name"}, {
                    contents: "22%",
                    dataType: "custom"
                }, {contents: "74%", dataType: "custom"}],
                [{contents: "Глазков Кондратий Чеславович", dataType: "name"}, {
                    contents: "100%",
                    dataType: "custom"
                }, {contents: "100%", dataType: "custom"}],
                [{contents: "Щавлева Вероника Семеновна", dataType: "name"}, {
                    contents: "54%",
                    dataType: "custom"
                }, {contents: "12%", dataType: "custom"}],
                [{contents: "Буркова Майя Семеновна", dataType: "name"}, {
                    contents: "63%",
                    dataType: "custom"
                }, {contents: "51%", dataType: "custom"}]
            ];

            let contents = templates.getTableHTML(tabs, header, rows);

            return templates.getPageHTML(contents, entityId, this.pageTitle);
        };
    }
});