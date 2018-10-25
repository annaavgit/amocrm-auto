define(['jquery', 'lib/common/hs', './htmlTemplates.js', './routes.js'], function ($, HandScroll, templates, pages) {
    return function (widgetCode, settings) {
        this.triggerId = widgetCode + '-mainMenuTrigger';
        this.entityId = widgetCode + 'Widget';
        this.settings = settings;
        this.buttonTitle = 'Автошкола';
        this.pageTitle = 'Управление автошколой';
        this.iconClass = "icon-settings";

        this.isSideMenuVisible = false;
        this.actionsBindSuccess = false;

        this.currentPage = false;

        this.deselectAllButtons = function () {
            $('.nav__menu__item-selected').removeClass('nav__menu__item-selected');
        };

        this.selectMainMenuButton = function () {
            $('.nav__menu__item--custom[data-entity="' + this.entityId + '"]').addClass('nav__menu__item-selected');
        };

        this.renderSideMenu = function () {
            let sideMenuItems = {
                groups: "Группы",
                teachers: "Преподаватели",
                schedule: "График занятий",
                instructors: "Инструкторы",
                salary: "Зарплаты инструкторов",
                profiles: "Личные данные инструкторов",
                alarms: "Напоминания",
                debt: "Должники"
            };

            sideMenuItems = {};
            Object.keys(pages).forEach(function (pageCode) {
                let pageTitle = pages[pageCode].pageTitle;
                sideMenuItems[pageCode] = pageTitle;
            });

            let sideMenuTitle = "Автошкола";

            let sideMenuHTML = templates.getAsideMenuHTML(sideMenuTitle, sideMenuItems);
            $('#left_menu').append(sideMenuHTML);
        };

        this.renderPage = function (pageCode) {
            let page = pages[pageCode];
            this.currentPage = page;
            return page.renderPage();
        };

        this.showSideOverlay = function () {
            $('.left-menu-overlay').addClass("default-overlay-visible hover-overlay");
        };

        this.hideSideOverlay = function () {
            $('.left-menu-overlay').removeClass("default-overlay-visible hover-overlay");
        };

        this.showSideMenu = function () {
            $('#left_menu').addClass('h-elevated');
            this.renderSideMenu();
            this.showSideOverlay();
            this.isSideMenuVisible = true;
        };

        this.hideSideMenu = function () {
            $('.aside--custom').remove();
            $('#left_menu').removeClass('h-elevated');
            this.hideSideOverlay();
            this.isSideMenuVisible = false;
        };

        this.toggleSideMenu = function () {
            if (this.isSideMenuVisible) {
                this.hideSideMenu();
            }
            else {
                this.showSideMenu();
            }
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
                this.hideSideMenu();
                this.currentPage = false;
            }
        };

        this.menuItemClicked = function (event) {
            event.preventDefault();
            let pageCode = $(event.currentTarget).data('code');
            this.renderPage(pageCode);
            this.hideSideMenu();
            this.selectMainMenuButton();

            return false;
        };

        this.widgetClickedInMainMenu = function (event) {
            this.deselectAllButtons();
            this.selectMainMenuButton();
            this.toggleSideMenu();
        };

        this.bindActions = function () {
            if (this.actionsBindSuccess) {
                return;
            }

            $(document).on('click', '#'+this.triggerId, this.widgetClickedInMainMenu.bind(this));
            $(document).on('click', '.nav__menu__item', this.checkGoAwayAndDeselectButton.bind(this));
            $(document).on('click', '.aside__list-item--custom a', this.menuItemClicked.bind(this));

            this.actionsBindSuccess = true;
        };

        return this;
    };
});