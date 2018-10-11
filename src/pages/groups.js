define(['jquery', '../htmlTemplates.js'], function ($, templates) {
    return function () {
        this.pageTitle = "Группы";
        this.statusIds = {
            "Первичный контакт": 20156290,
            "Принимают решение": 20156296,
            "На удаленке": 20156296,
            "Предварительные клиенты": 21380266,
            "Заморозка": 20174050,
            "Ожидающие": 20953081,
            "Ждем на договор": 22044724,
            "Договор заключен": 20953084,
            "Мед справка": 20331433,
            "Мед справка готова": 21928411,
            "Назначить инструктора": 21966004,
            "Инструктор назначен": 20330596,
            "Нет оплаты": 20156293,
            "Свидетельство": 20953087,
            "Госуслуги": 20331436,
            "ВЕК": 20953090,
            "ГИБДД": 20953093
        };

        this.grouppedLeads = false;

        this.getValueByFieldId = function (fieldId, lead) {
            if (!(lead['custom_fields'] instanceof Array)) {
                return false;
            }

            return lead['custom_fields'].reduce(function (foundValue, currentField) {
                if (currentField.id === fieldId) {
                    return currentField.values[0].value
                }

                return foundValue;
            }, false);
        };

        this.getValueByFieldName = function (fieldName, lead) {
            if (typeof lead[fieldName] === 'undefined') {
                return false;
            }

            return lead[fieldName];
        };

        this.getLeftover = function (lead) {
            let sum1 = parseInt( this.getValueByFieldId(413511, lead) || 0);
            let sum2 = parseInt( this.getValueByFieldId(413515, lead) || 0);
            let sum3 = parseInt( this.getValueByFieldId(413517, lead) || 0);

            let totalSum = this.getValueByFieldName("sale", lead) || 0;

            return totalSum - sum1 - sum2 - sum3;
        };

        this.getContact = function (lead) {
            return 'id'+lead.main_contact.id;
        };

        this.header = [
            {title: "Сделка", width: "30%", dataType: "custom", fieldGetter: this.getValueByFieldName.bind(this,"name")},
            {title: "Бюджет сделки", width: "30%", dataType: "custom", fieldGetter: this.getValueByFieldName.bind(this,"sale")},
            {title: "Контакт", width: "30%", dataType: "name", fieldGetter: this.getContact.bind(this)},
            {title: "Остаток", width: "30%", dataType: "custom", fieldGetter: this.getLeftover.bind(this)},
            {title: "Этап сделки", width: "35%", dataType: "custom", fieldGetter: this.getValueByFieldName.bind(this,"status_id")},
            {title: "Медкомиссия", width: "30%", dataType: "custom", fieldGetter: this.getValueByFieldId.bind(this,542317)},
            {title: "Госпошлина", width: "30%", dataType: "custom", fieldGetter: this.getValueByFieldId.bind(this,547261)},
            {title: "Теория", width: "30%", dataType: "custom", fieldGetter: this.getValueByFieldId.bind(this,413363)},
            {title: "Практика ВЕК", width: "30%", dataType: "custom", fieldGetter: this.getValueByFieldId.bind(this,413365)},
            {title: "Свидетельство", width: "30%", dataType: "custom", fieldGetter: this.getValueByFieldId.bind(this,413337)},
            {title: "Остаток", width: "30%", dataType: "custom", fieldGetter: this.getValueByFieldId.bind(this,538975)},
            {title: "ФИО инструктора", width: "30%", dataType: "name", fieldGetter: this.getValueByFieldId.bind(this,398075)},
            {title: "Дата экзамена ГИБДД", width: "35%", dataType: "custom", fieldGetter: this.getValueByFieldId.bind(this,540659)}
        ];

        this.authAmo = function () {
            let userName = 'mailjob@icloud.com';
            let userHash = '142a2eebe3051c6b30a9d2cbe3c4cbdb';
            let authUrl = 'https://mailjob.amocrm.ru/private/api/auth.php';

            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "POST",
                    url: authUrl,
                    data: {USER_LOGIN: userName, USER_HASH: userHash},
                    dataType: 'json',
                    success: function (result) {
                        resolve(result);
                    },
                    error: function (result) {
                        if (result && result.status === 200) {
                            resolve(result.responseText);
                        }
                        else {
                            reject(result);
                        }
                    }
                });
            });
        };

        this.loadAmoLeads = function () {
            let leadsUrl = 'https://mailjob.amocrm.ru/api/v2/leads';

            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: leadsUrl,
                    data: {
                        'filter/active': 1,
                        'filter/date_create': {
                            from: (new Date(2018, 6, 1)).getTime()/1000,
                            to: (new Date(2019, 0, 1)).getTime()/1000
                        }
                    },
                    success: function (result) {
                        resolve(result);
                    },
                    error: function (result) {
                        if (result && result.status === 200) {
                            resolve(result.responseText);
                        }
                        else {
                            reject(result);
                        }
                    }
                });
            });
        };

        this.getTableFromLeads = function (leads) {
            let page = this;
            let rows = leads.map(function (lead) {
                let leadFields = page.header.map(function (field) {
                    let fieldValue = field.fieldGetter(lead);
                    return {
                        contents: fieldValue,
                        dataType: field.dataType
                    };
                });

                return leadFields;
            });

            return rows;
        };

        this.splitLeadsByGroups = function (leadsResult) {
            let leads = leadsResult._embedded.items;
            let grouppedLeads = {};

            leads.forEach(function (lead) {
                let group = this.getValueByFieldId(399063, lead);
                if (typeof grouppedLeads[group] === 'undefined') {
                    grouppedLeads[group] = [];
                }

                grouppedLeads[group].push(lead);
            }, this);

            return grouppedLeads;
        };

        this.clickTab = function (event) {
            let groups = Object.keys(grouppedLeads);
            let groupToShow = $(event.currentTarget).text();
            let groupIndex = groups.indexOf(groupToShow);
            let tabs = groups;

            let rows = this.getTableFromLeads(grouppedLeads[groupToShow]);
            let tabHTML = templates.getTableHTML(tabs, this.header, rows);
            $('.custom-page-content').html(tabHTML);
            $('.custom-page-content .list__tab-link')
                .removeClass('list__tab-link_active')
                .eq(groupIndex)
                .addClass('list__tab-link_active');
        }

        this.getPageHTML = function (entityId) {
            let page = this;

            return this.authAmo()
                .then(this.loadAmoLeads.bind(this))
                .then(this.splitLeadsByGroups.bind(this))
                .then(function (grouppedLeads) {
                    this.grouppedLeads = grouppedLeads;

                    let groups = Object.keys(grouppedLeads);
                    let groupToShow = groups[0];
                    let tabs = groups;

                    let rows = page.getTableFromLeads(grouppedLeads[groupToShow]);
                    let contents = templates.getTableHTML(tabs, page.header, rows);

                    return templates.getPageHTML(contents, entityId, page.pageTitle);
                });
        };
    }
});