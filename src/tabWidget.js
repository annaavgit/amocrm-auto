define(['jquery'], function ($) {
    return function (widgetCode, settings) {
        this.triggerId = widgetCode + '-tabTrigger';
        this.entityId = widgetCode + 'Widget';
        this.settings = settings;
        this.buttonTitle = 'Тест';

        this.addToTabList = function () {
            let tabButtonHTML = "<div class=\"card-tabs__item js-card-tab\" data-id=\"" + this.entityId + "\" id=\"" + this.triggerId + "\">\n" +
                "    <span class=\"card-tabs__item-inner\" title=\"" + this.buttonTitle +"\">" + this.buttonTitle + "</span>\n" +
                "</div>";

            let tabHTML = "<div id=\"" + this.entityId + "\" class=\"linked-form-holder catalog_elements-in_card\" style=\"display: none;\">\n" +
                "    <div class='custom-widget-tab-content'>\n" +
                "        <p>Тут какое-то содержимое</p>\n" +
                "    </div>\n" +
                "</div>\n";

            $('#card_tabs').append(tabButtonHTML);
            $('.js-linked_elements_wrapper').append(tabHTML);
        };

        this.initWidget = function () {
            this.addToTabList();
        };

        this.hideOpenTabs = function () {
            $('.js-card-fields__linked-block, .js-card-main-fields, .js-linked_elements_wrapper div:not(#'+this.entityId+' div)').hide();
        };

        this.deselectTabButtons = function () {
            $('.js-card-tab').removeClass('selected');
        };

        this.moveTabSlider = function () {
            let $tabButton = $('#'+this.triggerId);
            let sliderPosition = $tabButton.position().left;
            let sliderWidth = $tabButton.outerWidth();

            $('.card-tabs-slider').css({left: sliderPosition, width: sliderWidth});
        };

        this.showTab = function () {
            this.hideOpenTabs();
            this.deselectTabButtons();

            $('#'+this.entityId).show();
            $('#'+this.triggerId).addClass('selected');
            this.moveTabSlider();
        };

        this.hideTab = function () {
            $('#'+this.entityId).hide();
            $('#'+this.triggerId).removeClass('selected');
        };

        this.bindActions = function () {
            $('#'+this.triggerId).on('click', this.showTab.bind(this));
            $(document).on('click', '.js-card-tab:not(#'+this.triggerId+')', this.hideTab.bind(this));
        };

        return this;
    };
});