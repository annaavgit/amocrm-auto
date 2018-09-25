define(['jquery', './htmlTemplates.js'], function ($, templates) {
    return function (widgetCode, settings) {
        this.triggerId = widgetCode + '-mainMenuTrigger';
        this.entityId = widgetCode + 'Widget';
        this.settings = settings;
        this.buttonTitle = 'Автошкола';
        this.pageTitle = 'Управление автошколой';
        this.iconClass = "icon-settings";

        this.actionsBindSuccess = false;

        this.getPageHTML = function () {
            let tabs = ["Группа 1", "Группа 2", "Группа 3"];
            let header = [
                {title: "ФИО инструктора", width: "30%", dataType: "name"},
                {title: "Регион 1", width: "35%", dataType: "custom"},
                {title: "Регион 2", width: "35%", dataType: "custom"}
            ];

            let rows = [
                [{contents: "Комягина Тамара Георгиевна", dataType: "name"}, {contents: "40%", dataType: "custom"}, {contents: "20%", dataType: "custom"}],
                [{contents: "Пелёвина Анна Владиленовна", dataType: "name"}, {contents: "22%", dataType: "custom"}, {contents: "74%", dataType: "custom"}],
                [{contents: "Лагутин Сергей Аполлинариевич", dataType: "name"}, {contents: "100%", dataType: "custom"}, {contents: "100%", dataType: "custom"}],
                [{contents: "Щукин Григорий Венедиктович", dataType: "name"}, {contents: "54%", dataType: "custom"}, {contents: "12%", dataType: "custom"}],
                [{contents: "Ягеман Моисей Назарович", dataType: "name"}, {contents: "63%", dataType: "custom"}, {contents: "51%", dataType: "custom"}],
                [{contents: "Бубнов Захар Титович", dataType: "name"}, {contents: "40%", dataType: "custom"}, {contents: "20%", dataType: "custom"}],
                [{contents: "Пономарева Элеонора Ростиславовна", dataType: "name"}, {contents: "22%", dataType: "custom"}, {contents: "74%", dataType: "custom"}],
                [{contents: "Арцишевский Мир Геннадиевич", dataType: "name"}, {contents: "100%", dataType: "custom"}, {contents: "100%", dataType: "custom"}],
                [{contents: "Палванова Регина Родионовна", dataType: "name"}, {contents: "54%", dataType: "custom"}, {contents: "12%", dataType: "custom"}],
                [{contents: "Колбягина Берта Петровна", dataType: "name"}, {contents: "63%", dataType: "custom"}, {contents: "51%", dataType: "custom"}],
                [{contents: "Истлентьева Кристина Давидовна", dataType: "name"}, {contents: "40%", dataType: "custom"}, {contents: "20%", dataType: "custom"}],
                [{contents: "Нагиева Алла Романовна", dataType: "name"}, {contents: "22%", dataType: "custom"}, {contents: "74%", dataType: "custom"}],
                [{contents: "Кахадзе Мир Наумович", dataType: "name"}, {contents: "100%", dataType: "custom"}, {contents: "100%", dataType: "custom"}],
                [{contents: "Канаша Аза Карповна", dataType: "name"}, {contents: "54%", dataType: "custom"}, {contents: "12%", dataType: "custom"}],
                [{contents: "Державина Христина Юлиевна", dataType: "name"}, {contents: "63%", dataType: "custom"}, {contents: "51%", dataType: "custom"}],
                [{contents: "Сарнычева Инга Тимуровна", dataType: "name"}, {contents: "40%", dataType: "custom"}, {contents: "20%", dataType: "custom"}],
                [{contents: "Решетов Данила Куприянович", dataType: "name"}, {contents: "22%", dataType: "custom"}, {contents: "74%", dataType: "custom"}],
                [{contents: "Глазков Кондратий Чеславович", dataType: "name"}, {contents: "100%", dataType: "custom"}, {contents: "100%", dataType: "custom"}],
                [{contents: "Щавлева Вероника Семеновна", dataType: "name"}, {contents: "54%", dataType: "custom"}, {contents: "12%", dataType: "custom"}],
                [{contents: "Буркова Майя Семеновна", dataType: "name"}, {contents: "63%", dataType: "custom"}, {contents: "51%", dataType: "custom"}]
            ];

            let contents = templates.getTableHTML(tabs, header, rows);

            return templates.getPageHTML(contents, this.entityId, this.pageTitle);
        };

        this.deselectAllButtons = function () {
            $('.nav__menu__item-selected').removeClass('nav__menu__item-selected');
        };

        this.selectMainMenuButton = function () {
            $('.nav__menu__item--custom[data-entity="' + this.entityId + '"]').addClass('nav__menu__item-selected');
        };

        this.showPage = function () {
            this.deselectAllButtons();
            this.selectMainMenuButton();

            let pageHTML = this.getPageHTML();
            $('#page_holder').html(pageHTML);
            return true;
        };

        this.addButtonToMainMenu = function (afterButtonCode) {
            if (!afterButtonCode) {
                afterButtonCode = 'leads'; //['leads', 'todo', 'catalogs', 'mail', 'stats', 'settings']
            }

            let menuItemHTML = "<div class=\"nav__menu__item--custom \" data-entity=\"" + this.entityId+ "\">\n" +
                "    <span class=\"nav__menu__item__link--custom\" id=\"" + this.triggerId + "\">\n" +
                "        <div class=\"nav__menu__item__icon " + this.iconClass + "\">\n" +
                "            <span class=\"js-notifications_counter nav__notifications__counter\" style=\"display: none\"></span>\n" +
                "        </div>\n" +
                "        <div class=\"nav__menu__item__title\">" + this.buttonTitle + "</div>\n" +
                "    </span>\n" +
                "</div>";

            $('#nav_menu [data-entity='+afterButtonCode+']').after(menuItemHTML);
        };

        this.isInitialized = function () {
            return $('.nav__menu__item--custom[data-entity="' + this.entityId + '"]').length > 0;
        };

        this.initWidget = function (afterButtonCode) {
            if ( !this.isInitialized() ) {
                this.addButtonToMainMenu(afterButtonCode);
            }
        };

        this.checkGoAwayAndDeselectButton = function (event) {
            let $clickedButton = $(event.target.parentNode);
            let isGoAway = $clickedButton.data('entity') !== this.entityId;

            if (isGoAway) {
                $('#nav_menu [data-entity='+ this.entityId +']').removeClass('nav__menu__item-selected');
            }
        };

        this.bindActions = function () {
            if (this.actionsBindSuccess) {
                return;
            }

            $('#'+this.triggerId).on('click', this.showPage.bind(this));
            $('.nav__menu__item').on('click', this.checkGoAwayAndDeselectButton.bind(this));
            this.actionsBindSuccess = true;
        };

        return this;
    };
});