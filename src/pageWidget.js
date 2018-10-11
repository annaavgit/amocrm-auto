define(['jquery', './htmlTemplates.js', './routes.js'], function ($, templates, pages) {
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

        this.getPageHTML = function (pageCode) {
            let page = pages[pageCode];
            return page.getPageHTML(this.entityId);
        };

        this.adjustTables = function () {
            $('.list__table__holder').each(function () {
                let $table = $(this);
                let $firstRowCells = $table.find('.list-row:not(.list-row-head)').eq(0).find('.list-row__cell');
                let $headerCells = $table.find('.list-row-head').eq(0).find('.list-row__cell');
                let widths = [];
                $firstRowCells.each(function () {
                    widths.push($(this).width());
                });

                console.log(widths);
                let totalWidth = widths.reduce(function (sum, width) {
                    return sum+width;
                }, 0);
                console.log(totalWidth);

                $table.width(totalWidth);
                $('.list__body__holder, .custom-page-content').width(totalWidth);
                $headerCells.each(function (index) {
                    let elementsWidth = 19;
                    $(this).width(widths[index]);
                })
            });
        };

        this.afterRender = function () {
            this.adjustTables();
        };

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

        this.showPage = function (pageCode) {
            let widget = this;
            let pageHTML = this.getPageHTML(pageCode);
            this.currentPage = pages[pageCode];

            if (typeof pageHTML === 'string') {
                $('#page_holder').html(pageHTML);
                widget.afterRender();
            }
            else {
                let pageHTMLPromise = pageHTML;
                pageHTMLPromise
                    .then(function (pageHTML) {
                        $('#page_holder').html(pageHTML);
                        widget.afterRender();
                    });
            }

            return true;
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
            this.showPage(pageCode);
            this.hideSideMenu();
            this.selectMainMenuButton();

            return false;
        };

        this.widgetClickedInMainMenu = function (event) {
            this.deselectAllButtons();
            this.selectMainMenuButton();
            this.toggleSideMenu();
        };

        this.clickTab = function (event) {
            if (this.currentPage && typeof this.currentPage.clickTab === 'function') {
                this.currentPage.clickTab(event);
                this.adjustTables();
            }
        };

        this.bindActions = function () {
            if (this.actionsBindSuccess) {
                return;
            }

            $(document).on('click', '#'+this.triggerId, this.widgetClickedInMainMenu.bind(this));
            $(document).on('click', '.nav__menu__item', this.checkGoAwayAndDeselectButton.bind(this));
            $(document).on('click', '.aside__list-item--custom a', this.menuItemClicked.bind(this));
            $(document).on('click', '.custom-page-content a.list__tab-link', this.clickTab.bind(this));

            this.actionsBindSuccess = true;
        };

        return this;
    };
});