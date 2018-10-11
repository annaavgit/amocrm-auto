define(['jquery', './src/pageWidget.js'], function ($, PageWidget) {
    return function () {
        let settings = this.get_settings();
        let widgetCode = 'workaholics_auto';

        this.includeCSS = function () {
            $('head').append('<style>\n' +
                '.custom-tab-content { padding: 0 30px; }\n' +
                '.custom-page-content { padding: 0 30px; }\n' +
                '.nav__menu__item--custom {margin: 16px 0 0; position: relative; cursor: pointer; line-height: 70px; text-align: center;}\n' +
                '.nav__menu__item__link--custom {text-decoration: none;color: #9da8ae;font-size: 0;outline: none;}\n' +
                'html.no-touch .nav__menu__item--custom:hover:not(.nav__menu__item-selected) .icon-leads:before,html.touch .nav__menu__item--custom:active:not(.nav__menu__item-selected) .icon-leads:before {\n' +
                '    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4wMzdweCIgaGVpZ2h0PSIzNS45cHgiIHZpZXdCb3g9Ii0wLjc2NSAtMSAyOS4wMzcgMzUuOSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMC43NjUgLTEgMjkuMDM3IDM1LjkiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnIGlkPSJJY29uc194NUZfQWxsIj48ZyBpZD0iTGVhZHNfeDVGX24iPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMjAuODE4LDkuNDM5YzMuNTkxLDIuMzEyLDUuOTcsNi4zNDcsNS45NywxMC45MzhjMCw3LjE4LTUuODE3LDEzLTEzLjAwMiwxM2MtNy4xODMsMC0xMy01LjgyLTEzLTEzYzAtMS40NTUsMC4yMzctMi44NTUsMC42OC00LjE2MmwwLjA3Mi0wLjQyMiIvPjxnPjxnPjxnPjxnPjxnPjxnPjxnPjxnPjxnPjxkZWZzPjxwYXRoIGlkPSJTVkdJRF8xXyIgZD0iTTI2Ljc4NiwyMC4zNzRjMCw3LjE4MS01LjgxNSwxMy0xMy4wMDIsMTNjLTcuMTgxLDAtMTMtNS44MTktMTMtMTNjMC03LjE4MS04LjQ0NS0yMy4yNDMsMTMtMjMuMjQzQzI0Ljg0Ni0yLjg2NywyNi43ODYsMTMuMTk1LDI2Ljc4NiwyMC4zNzR6Ii8+PC9kZWZzPjxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPjx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgb3ZlcmZsb3c9InZpc2libGUiLz48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNOS4yODksNDAuMjU3di00LjYzMWMtMy4yNjctMC4xNDYtNi40MzUtMS4wMjEtOC4yODUtMi4wOTZsMS40NjItNS43MDFjMi4wNDcsMS4xMjEsNC45MjMsMi4xNDYsOC4wOSwyLjE0NmMyLjc3OCwwLDQuNjgyLTEuMDY0LDQuNjgyLTMuMDIxYzAtMS44NTQtMS41NjItMy4wMjEtNS4xNjctNC4yMzZjLTUuMjE3LTEuNzU4LTguNzczLTQuMTkyLTguNzczLTguOTIxYzAtNC4yODksMy4wMjEtNy42NTEsOC4yMzYtOC42NzZWMC40OWg0Ljc3NnY0LjI5YzMuMjY5LDAuMTQ2LDUuNDYxLDAuODI4LDcuMDY1LDEuNjA3bC0xLjQxMyw1LjUwOGMtMS4yNzEtMC41MzYtMy41MDktMS42NTctNy4wMjMtMS42NTdjLTMuMTY4LDAtNC4xODksMS4zNjQtNC4xODksMi43MjljMCwxLjYwNiwxLjcwNiwyLjYzMiw1Ljg1NCw0LjE4OWM1LjgwNiwyLjA0OCw4LjE0NCw0LjcyOSw4LjE0NCw5LjExNWMwLDQuMzM4LTMuMDY3LDguMDM5LTguNjc4LDkuMDE0djQuOTc1TDkuMjg5LDQwLjI1N0w5LjI4OSw0MC4yNTd6Ii8+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9zdmc+)\n' +
                '}\n' +
                '</style>');
        };

        this.loadScripts = function () {
            $.getScript('https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js');
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

        this.initWidget = function () {
            this.includeCSS();
            this.loadScripts();

            this.pageWidget = new PageWidget(widgetCode, settings);
            this.pageWidget.initWidget('leads');

            return true;
        };

        this.bindActions = function () {
            this.pageWidget.bindActions();

            return true;
        };

        this.destroyWidget = function () {
            return true;
        };

        let requiredCallbacks = {
            render: this.putWidgetToDOM.bind(this),
            init: this.initWidget.bind(this),
            bind_actions: this.bindActions.bind(this)
        };

        let additionalCallbacks = {
            destroy: this.destroyWidget.bind(this),
            onSave: function () {
                return true;
            }
        };

        this.callbacks = $.extend({}, requiredCallbacks, additionalCallbacks);

        return this;
    };
});