#!/bin/bash

 

export APP_NAME='smart-sheets-demo-632adb34-5429';

 
  source ./credentials.sh
 
 
  TARGET_DIRECTORY="${SPACE}-${REGION}"
  echo "Target directory: ${TARGET_DIRECTORY}"
  mkdir "${TARGET_DIRECTORY}"

  cf login -a "$API" -o "$ORG" -s "$SPACE" -u "$CF_USER" -p "$CF_PASS"

  cf env "${APP_NAME}" | grep 'User-Provided:' -A 34 | grep ': ' > ups.txt && sed -i 's/: /=/g' ups.txt
  cf env "${APP_NAME}" > env.txt
  sed '/^VCAP_SERVICES/,/^}/!d' < env.txt > vcap_services.json
  sed '/^VCAP_APPLICATION/,/^}/!d' < env.txt > vcap_application.json
  sed -i 's/VCAP_SERVICES: //g' vcap_services.json
  sed -i 's/VCAP_APPLICATION: //g' vcap_application.json
  VS=$(jq . -c < vcap_services.json)
  VA=$(jq . -c < vcap_application.json)
  echo VCAP_SERVICES="$VS" >> ups.txt
  echo VCAP_APPLICATION="$VA" >> ups.txt
  FILE_NAME="./${TARGET_DIRECTORY}/.env"
  mv ups.txt "$FILE_NAME"
  rm env.txt vcap_application.json vcap_services.json
 