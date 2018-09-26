#!/bin/bash

loadDotenv () {
  set -a
  [ -f ../.env ] && . ../.env
  set +a
}

loadDotenv

login=$AMO_LOGIN
password=$AMO_PASSWORD
crmCode=$AMO_CRMCODE

crmUrl="https://$crmCode.amocrm.ru/"
authUrl="https://$crmCode.amocrm.ru/oauth2/authorize"
uploadUrl="https://widgets.amocrm.ru/$crmCode/upload/"
apiSettingsUrl="https://$crmCode.amocrm.ru/settings/dev/"

curl -s \
     --cookie-jar uploadCookies.txt \
     ${crmUrl} > /dev/null

csrfToken=`grep csrf_token uploadCookies.txt | awk '{print $7}'`
authFormData="{\"password\":\"$password\",\"username\":\"$login\", \"csrf_token\": \"$csrfToken\"}"

curl -s \
     --header "Content-Type: application/json" \
     --data "$authFormData" \
     --cookie uploadCookies.txt \
     --cookie-jar uploadCookies.txt \
     ${authUrl} > /dev/null

curl -s \
     --cookie uploadCookies.txt \
     --cookie-jar uploadCookies.txt \
     ${apiSettingsUrl} > settings.html
apiHash=`grep dev_api_hash settings.html | sed -e "s|^[^>]*>||;s|<.*$||"`
rm settings.html

widgetCode=`jq -r '.widget.code' ../manifest.json`
widgetSecret=`jq -r '.widget.secret_key' ../manifest.json`

curl -s \
     -F secret=${widgetSecret} \
     -F widget=${widgetCode} \
     -F amouser=${login} \
     -F amohash=${apiHash} \
     -F widget=@../build/widget.zip \
     --cookie-jar uploadCookies.txt \
     ${uploadUrl}

rm uploadCookies.txt