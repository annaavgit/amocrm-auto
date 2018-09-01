define(['jquery', './src/tabWidget.js', './src/pageWidget.js'], function ($, TabWidget, PageWidget) {
    return function () {
        let widget = this;
        let settings = this.get_settings();
        let widgetCode = 'instructorSalary';

        this.includeCSS = function () {
            $('head').append('<style>\n' +
                '.custom-tab-content { padding: 0 30px; }\n' +
                '.custom-page-content { padding: 0 30px; }\n' +
                '.nav__menu__item--custom {margin: 16px 0 0; position: relative; cursor: pointer; line-height: 70px; text-align: center;}\n' +
                '.nav__menu__item__link--custom {text-decoration: none;color: #9da8ae;font-size: 0;outline: none;}\n' +
                '</style>');
        };

        this.addButtonToListContextMenu = function () {
            let triggerId = widgetCode + '-contextTrigger';
            let menuItemName = 'Тестовый виджет';

            let alreadyAdded = $('#'+triggerId).length > 0;
            if (alreadyAdded) {
                return;
            }

            let menuItemHTML = "<li class=\"button-input__context-menu__item  element__\" id=\"" + triggerId +"\">" +
                "    <div class=\"button-input__context-menu__item__inner\">" +
                "        <div class='icon'></div>" +
                "        <span class=\"button-input__context-menu__item__text\">" + menuItemName + "</span>" +
                "    </div>" +
                "</li>";

            $('.context-menu-pipeline').append(menuItemHTML);
        };

        this.putWidgetToDOM = function () {
            let widgetHTML ='<div class="widget"></div>';

            this.render_template({
                caption: {
                    class_name: widgetCode + 'Widget',
                },
                body: widgetHTML,
                render: ''
            });

            return true;
        };

        this.showWidgetContext = function () {
            console.log('showWidgetContext');
            return true;
        };

        this.showWidgetForSelectedLeads = function (leads) {
            console.log('showWidgetForSelectedLeads', leads);
            return true;
        };

        this.initWidget = function () {
            this.includeCSS();

            this.addButtonToListContextMenu();

            this.tabWidget = new TabWidget(widgetCode, settings);
            this.tabWidget.initWidget();

            this.pageWidget = new PageWidget(widgetCode, settings);
            this.pageWidget.initWidget('leads');

            return true;
        };

        this.bindActions = function () {
            $('#'+widgetCode+'-contextTrigger').on('click', this.showWidgetContext.bind(this));

            this.tabWidget.bindActions();
            this.pageWidget.bindActions();

            return true;
        };

        this.destroyWidget = function () {
            return true;
        };

        this.callbacks = {
            render: this.putWidgetToDOM.bind(this),
            init: this.initWidget.bind(this),
            bind_actions: this.bindActions.bind(this),
            leads: {
                selected: (function () {
                    let selectedLeads = this.list_selected().selected;
                    this.showWidgetForSelectedLeads(selectedLeads);
                }).bind(this)
            },
            destroy: this.destroyWidget.bind(this)
        };

        return this;
    };
});