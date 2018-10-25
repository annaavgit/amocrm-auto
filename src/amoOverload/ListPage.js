define(['jquery', "underscore", "lib/core/page", "lib/pages/list"], function ($, _, Page, ListPage) {
    return ListPage.extend({
        groupId: false,
        pipelineId: "1191751",
        groups: false,

        initialize: function(params) {
            ListPage.prototype.initialize.call(this, params);
        },

        construct: function(params) {
            ListPage.prototype.construct.call(this, params);
            this.bindEventsAfterRender();
        },

        _getTemplateAndHolder: function(forListOnly) {
            return forListOnly === true ? {
                    container: "#list_holder",
                    template: "/tmpl/leads/inner.twig"
                }
                : {
                    container: "#page_holder",
                    template: "/tmpl/leads/list.twig"
                }
        },

        _makeRequest: function() {
            let ajaxLeadsUrl = 'https://mailjob.amocrm.ru/ajax/leads/list/pipeline/' + this.pipelineId + '/';
            let page = this;

            return this.getGroups()
                .then(function (groups) {
                    if (page.getGroupId() === false) {
                        page.setGroupId( groups[0] );
                    }
                })
                .then(function () {
                    return $.ajax({
                        type: "POST",
                        url: ajaxLeadsUrl,
                        data: {
                            "filter[cf][399063]": page.getGroupId(),
                            "useFilter": "y"
                        },
                        dataType: 'json'
                    });
                });
        },
        
        _renderPage: function (params) {
            ListPage.prototype._renderPage.call(this, params);
            this.renderTabs();
        },

        bindEventsAfterRender: function () {
            this.$el.on('click', '.list__tab-link', this.clickTab.bind(this));
        },

        reloadPage: function () {
            this.initialize();
        },

        clickTab: function (event) {
            event.preventDefault();
            let $clickedTab = $(event.currentTarget);
            this.setGroupId( $clickedTab.data('group-id').toString() );
            this.reloadPage();

            return false;
        },

        authAmo: function () {
            let userName = 'mailjob@icloud.com';
            let userHash = '142a2eebe3051c6b30a9d2cbe3c4cbdb';
            let authUrl = 'https://mailjob.amocrm.ru/private/api/auth.php';
            let promise = $.Deferred();

            $.ajax({
                type: "POST",
                url: authUrl,
                data: {USER_LOGIN: userName, USER_HASH: userHash},
                dataType: 'json',
                success: function (result) {
                    promise.resolve(result);
                },
                error: function (result) {
                    if (result && result.status === 200) {
                        promise.resolve(result.responseText);
                    }
                    else {
                        promise.reject(result);
                    }
                }
            });

            return promise;
        },
    
        loadAmoLeads: function () {
            let leadsUrl = 'https://mailjob.amocrm.ru/api/v2/leads';
            let promise = $.Deferred();

            $.ajax({
                url: leadsUrl,
                data: {
                    'filter[active]': 1
                },
                success: function (result) {
                    promise.resolve(result);
                },
                error: function (result) {
                    if (result && result.status === 200) {
                        promise.resolve(result.responseText);
                    }
                    else {
                        promise.reject(result);
                    }
                }
            });

            return promise;
        },

        getCustomFieldValue: function (lead, targetFieldId) {
            if (!(lead['custom_fields'] instanceof Array)) {
                return false;
            }

            return lead['custom_fields'].reduce(function (foundValue, currentField) {
                if (currentField.id === targetFieldId) {
                    return currentField.values[0].value
                }

                return foundValue;
            }, false);
        },

        setGroupId: function (newId) {
            this.groupId = newId;
        },

        getGroupId: function () {
            return this.groupId;
        },

        loadGroups: function () {
            let page = this;
            let groupFieldId = 399063;

            return this.authAmo()
                .then(this.loadAmoLeads.bind(this))
                .then(function (leadsResponse) {
                    let leads = leadsResponse['_embedded']['items'];

                    let unsortedGroups = leads.reduce(function (collectedGroups, lead) {
                        let groupId = page.getCustomFieldValue(lead, groupFieldId);
                        if (groupId && collectedGroups.indexOf(groupId) === -1) {
                            collectedGroups.push(groupId);
                        }

                        return collectedGroups;
                    }, []);

                    let sortedGroups = unsortedGroups;
                    sortedGroups.sort(function(a, b){
                        return a.localeCompare(b);
                    });

                    return sortedGroups;
                });
        },

        setGroups: function (newGroups) {
            this.groups = newGroups;
        },

        getGroups: function () {
            let page = this;

            if (this.groups) {
                return $.Deferred().resolve(this.groups);
            }
            else {
                return this.loadGroups()
                    .then(function (newGroups) {
                        page.setGroups(newGroups);
                        return newGroups;
                    });
            }
        },

        renderTabs: function () {
            let activeGroupName = this.getGroupId();
            return this.getGroups()
                .then(function (groups) {
                    let tabsHTML = "<ul class=\"list__tabs \" id=\"list__tabs\">\n" +
                        groups.map(function (groupName) {
                            let isActive = groupName === activeGroupName;
                            let activeClass = isActive ? "list__tab-link_active" : "";
                            let displayGroupName = groupName.replace(/ /g,"&nbsp;");

                            return  "<li class=\"list__tab-item\">\n" +
                                "    <a href=\"#\" class=\"list__tab-link js-navigate-link navigate-link-nodecor "+activeClass+"\" data-list-type=\"leads\" data-group-id='"+groupName+"'>"+displayGroupName+"</a>\n" +
                                "</li>\n";
                        }).join("\n") +
                        "</ul>";

                    $('#list__tabs').remove();
                    $('.list__table__holder').prepend(tabsHTML);
                });
        }
    });
});
