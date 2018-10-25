define([
    'jquery',
    '../htmlTemplates.js',
    "lib/components/lists/index",
    "../amoOverload/ListPage.js"
],
function ($, templates, ListIndex, Page) {
    return function () {
        this.pageTitle = "Группы";
        this.renderPage = function () {
            let page = new Page();
            return true;
        };
    }
});