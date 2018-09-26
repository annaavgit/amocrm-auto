define(['jquery'], function ($) {
    return new function () {
        this.getTableHeadCellHTML = function (title, width, dataType) {
            return "<div class=\"list-row__cell js-hs-prevent js-resizable-cell list-row__cell-head cell-head js-cell-head js-cell-head_sortable list-row__cell-template-"+dataType+" cell-head_sorted ui-resizable\"\n" +
                "     data-field-template=\""+dataType+"\"\n" +
                "     style=\"width: "+width+"; \">\n" +
                "    <div class=\"cell-head__inner\">\n" +
                "        <div class=\"cell-head__inner-content\">\n" +
                "            <span class=\"cell-head__dots icon icon-v-dots\"></span>\n" +
                "            <span class=\"cell-head__title\">"+title+"</span>\n" +
                "            <span class=\"cell-head__icon\">\n" +
                "                <span class=\"cell-head__icon-sortable cell-head__icon-sortable_desc\"></span>\n" +
                "                <span class=\"cell-head__icon-close js-cell-head__icon-close\">\n" +
                "                    <svg class=\"svg-icon svg-common--cross-close-dims\">\n" +
                "                        <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#common--cross-close\"></use>\n" +
                "                    </svg>\n" +
                "                </span>\n" +
                "            </span>\n" +
                "        </div>\n" +
                "        <div class=\"cell-head__resize-ghost\"></div>\n" +
                "    </div>\n" +
                "    <div class=\"ui-resizable-handle ui-resizable-e\" style=\"z-index: 90;\"></div>\n" +
                "</div>";
        };

        this.getTableHeaderHTML = function(headerCells) {
            let checkBoxCell = "<div class=\"list-row__cell js-hs-prevent list-row__cell-head cell-head list-row__cell-template-id list-row__cell-id\">\n" +
                "    <div class=\"cell-head__inner\">\n" +
                "        <label class=\"control-checkbox\">\n" +
                "            <div class=\"control-checkbox__body\">\n" +
                "                <input type=\"checkbox\" class=\"\" name=\"\" id=\"list_all_checker\" value=\"\" data-value=\"\">\n" +
                "                <span class=\"control-checkbox__helper\"></span>\n" +
                "            </div>\n" +
                "        </label>\n" +
                "    </div>\n" +
                "</div>";

            let checkBoxCellGroup = "<div class=\"list-column-code-id js-list-column list__col-group__column\" data-field-code=\"id\"></div>";

            let cellHTML = [ checkBoxCell ];

            let cellGroupHTML = [ checkBoxCellGroup ];

            headerCells.forEach(function (cell) {
                cellHTML.push(this.getTableHeadCellHTML(cell.title, cell.width, cell.dataType));
                cellGroupHTML.push("<div class=\"js-list-column list__col-group__column\" style=\"width:"+cell.width+"; \"></div>");
            }, this);

            return "<div class=\"js-scroll-container list__table \" id=\"list_table\">\n" +
                "    <div class=\"js-list-columns-group list__col-group\" id=\"list_col_group\">\n" +
                cellGroupHTML.join("\n") +
                "    </div>\n" +
                "    <div class=\"list-row list-row-head js-list-row js-list-row-head \" id=\"list_head\">\n" +
                cellHTML.join("\n") +
                "    </div>\n" +
                "</div>"
        };

        this.getRowCellHTML = function (contents, width, dataType) {
            return "<div class=\"list-row__cell js-list-row__cell list-row__cell-template-"+dataType+"  \" style=\"width:"+width+"; \">\n" +
                "    <div class=\"content-table__item__inner\">"+contents+"</div>\n" +
                "</div>\n";
        };

        this.getTableRowHTML = function (rowCells, headerCells) {
            let checkBoxCell = "<div class=\"list-row__cell js-list-row__cell list-row__cell-template-id list-row__cell-id  \">\n" +
                "    <div class=\"content-table__item__inner\" style=\"overflow:visible\">\n" +
                "        <label class=\"control-checkbox   \">\n" +
                "            <div class=\"control-checkbox__body\">\n" +
                "                <input type=\"checkbox\" class=\"\" name=\"\" id=\"\" value=\"\" data-value=\"\">\n" +
                "                <span class=\"control-checkbox__helper \"></span>\n" +
                "            </div>\n" +
                "        </label>\n" +
                "    </div>\n" +
                "</div>";

            let rowCellsHTML = [ checkBoxCell ];
            rowCells.forEach(function (cell, index) {
                let headerCell = headerCells[index];
                rowCellsHTML.push( this.getRowCellHTML(cell.contents, headerCell.width, headerCell.dataType) );
            }, this);

            return "<div data-id=\"\"\n" +
                "     class=\"list-row js-list-row\"\n" +
                "     id=\"\">" +
                rowCellsHTML.join("\n") +
                "</div>\n";
        };

        this.getTableTabsHTML = function (tabs) {
            let tabsHTML = [];
            tabs.forEach(function (tab, index) {
                let isActive = index === 0;
                let activeClass = isActive
                    ? "list__tab-link_active"
                    : "";

                tabsHTML.push("<li class=\"list__tab-item\">\n" +
                    "    <a href=\"#\" class=\"list__tab-link js-navigate-link navigate-link-nodecor "+activeClass+"\">"+tab+"</a>\n" +
                    "</li>\n");
            }, this);

            return "<ul class=\"list__tabs \" id=\"list__tabs\">\n" +
                tabsHTML.join("\n") +
                "</ul>";
        };

        this.getTableHTML = function (tabs, header, rows) {
            let _this = this;
            let rowsHTML = rows.reduce(function (accumulator, row) {
                accumulator.push(_this.getTableRowHTML(row, header));
                return accumulator;
            }, []);

            return "<div class=\"list__table__holder js-hs-scroller custom-scroll\" style=\"margin-bottom: 0px;\">\n" +
                this.getTableTabsHTML(tabs) +
                this.getTableHeaderHTML(header) +
                rowsHTML.join("\n") +
                "</div>"
        };

        this.getPageTopActionsHTML = function () {
            return "<div class=\"list-top-nav__icon-button list-top-nav__icon-button_dark list-top-nav__icon-button_context\">\n" +
                "    <div class=\"button-input-wrapper button-input-more content__top__action__btn-more\">\n" +
                "        <button type=\"button\" class=\"button-input button-input-with-menu  \" tabindex=\"\" id=\"\" title=\"Еще\">\n" +
                "            <span class=\"button-input-inner button-input-more-inner\">\n" +
                "                <svg class=\"svg-icon svg-controls--button-more-dims\"><use\n" +
                "                        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n" +
                "                        xlink:href=\"#controls--button-more\"></use></svg>\n" +
                "            </span>\n" +
                "        </button>\n" +
                "        <ul class=\"button-input__context-menu \">\n" +
                "        </ul>\n" +
                "    </div>\n" +
                "</div>\n" +
                "<a href=\"#\" data-href=\"#\" class=\"button-input  button-input_blue js-navigate-link\">\n" +
                "    <svg class=\"svg-icon svg-controls--button-add-dims\">\n" +
                "        <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#controls--button-add\"></use>\n" +
                "    </svg>\n" +
                "    <span class=\"button-input-inner__text button-input-inner__text_short\">Кнопка</span>\n" +
                "    <span class=\"button-input-inner__text\">Кнопка для чего-то</span>\n" +
                "</a>\n";
        };


        this.getPageHTML = function (contentsHTML, entityId, pageTitle) {
            return "<div class=\"list  list-contacts list-no-sidebar\" id=\"list_page_holder\">\n" +
                "    <div class=\"list__body clearfix\">\n" +
                "        <div id=\"list__body-right\" class=\"list__body-right list__body-right_has-footer\">\n" +
                "            <div class=\"list__body-right__top\">\n" +
                "                <div class=\"list__top__preset\">\n" +
                "                    <span class=\"list-top-nav__text-button list-top-nav__text-button_submenu js-list-top-nav__text-button_submenu list-top-nav__text-button_active h-text-overflow\"\n" +
                "                          data-entity=\"" + entityId +"\">" + pageTitle + "</span>\n" +
                "                </div>\n" +
                "                <div class=\"list__top__actions\">\n" +
                this.getPageTopActionsHTML() +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"list__body__holder list__body__holder-table js-hs-wrapper hs-wrapper_hide-boundary hs-wrapper\" id=\"list_holder\">\n" +
                "                <div class=\"custom-page-content\">\n" +
                contentsHTML +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
        };

        this.getAsideMenuHTML = function (title, items) {
            let itemsHTML = [];
            Object.keys(items).forEach(function (itemCode) {
                let itemText = items[itemCode];
                let itemHTML = "<li class=\"aside__list-item \">\n" +
                "    <a href=\"#\" data-code=\""+itemCode+"\" class=\"aside__list-item-link navigate-link-nodecor h-text-overflow js-navigate-link js-list-contacts-caption-link\">"+itemText+"</a>\n" +
                "</li>";
                itemsHTML.push(itemHTML);
            });

            return "<div class=\"aside aside-toggleable aside-hover aside-hover-catalogs aside-visible aside-expanded\" id=\"aside-hover\">\n" +
                "    <div class=\"aside__top\"><h2 class=\"aside__head\">"+title+"</h2></div>\n" +
                "    <div class=\"aside__inner aside__inner_has-footer\">\n" +
                "        <div class=\"aside__common-settings custom-scroll\">\n" +
                "            <div class=\"aside__common-settings__list_wrapper\" id=\"aside__list-wrapper\">\n" +
                "                <ul class=\"aside__list\">\n" +
                itemsHTML.join("\n") + "\n" +
                "                </ul>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
        }
    }
});