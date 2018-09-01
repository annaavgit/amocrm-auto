define(['jquery'], function ($) {
    return function (widgetCode, settings) {
        this.triggerId = widgetCode + '-mainMenuTrigger';
        this.entityId = widgetCode + 'Widget';
        this.settings = settings;
        this.buttonTitle = 'Тест';
        this.pageTitle = 'Тестовая страница';
        this.iconClass = "icon-settings";

        this.actionsBindSuccess = false;

        this.getPageHTML = function () {
            return "<div class=\"list  list-contacts list-no-sidebar\" id=\"list_page_holder\">\n" +
                "    <div class=\"list__body clearfix\">\n" +
                "        <div id=\"list__body-right\" class=\"list__body-right list__body-right_has-footer\">\n" +
                "            <div class=\"list__body-right__top\">\n" +
                "                <div class=\"list__top__preset\">\n" +
                "                    <span class=\"list-top-nav__text-button list-top-nav__text-button_submenu js-list-top-nav__text-button_submenu list-top-nav__text-button_active h-text-overflow\"\n" +
                "                          data-entity=\"" + this.entityId +"\">" + this.pageTitle + "</span>\n" +
                "                </div>\n" +
                "                <div class=\"list__top__actions\">\n" +
                "                    <div class=\"list-top-nav__icon-button list-top-nav__icon-button_dark list-top-nav__icon-button_context\">\n" +
                "                        <div class=\"button-input-wrapper button-input-more content__top__action__btn-more\">\n" +
                "                            <button type=\"button\" class=\"button-input button-input-with-menu  \" tabindex=\"\" id=\"\" title=\"Еще\">\n" +
                "                                <span class=\"button-input-inner button-input-more-inner\">\n" +
                "                                    <svg class=\"svg-icon svg-controls--button-more-dims\"><use\n" +
                "                                            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n" +
                "                                            xlink:href=\"#controls--button-more\"></use></svg>\n" +
                "                                </span>\n" +
                "                            </button>\n" +
                "                            <ul class=\"button-input__context-menu \">\n" +
                "                            </ul>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <a href=\"#\" data-href=\"#\" class=\"button-input  button-input_blue js-navigate-link\">\n" +
                "                        <svg class=\"svg-icon svg-controls--button-add-dims\">\n" +
                "                            <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#controls--button-add\"></use>\n" +
                "                        </svg>\n" +
                "                        <span class=\"button-input-inner__text button-input-inner__text_short\">Кнопка</span>\n" +
                "                        <span class=\"button-input-inner__text\">Кнопка для чего-то</span>\n" +
                "                    </a>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"list__body__holder list__body__holder-table js-hs-wrapper hs-wrapper_hide-boundary hs-wrapper\" id=\"list_holder\">\n" +
                "                <div class=\"custom-page-content\">\n" +
                "                    Тут данные\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
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