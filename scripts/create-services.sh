#!/bin/bash

# Set your env here
source ./credentials.sh


btp login --url $URL --subdomain $GLOBAL_ACCOUNT_ID --user $CF_USER --password $CF_PASS

btp list accounts/entitlement --subaccount $SUBACCOUNT_ID | sed -n '4,4p'
APP_RUNTIME=$(btp list accounts/entitlement --subaccount "${SUBACCOUNT_ID}" | grep APPLICATION_RUNTIME | awk '{print  $3 ;}')
echo "APP_RUNTIME is ${APP_RUNTIME}"

if [ -z "$APP_RUNTIME" ]
then
    echo "No APP_RUNTIME. Should be created."
    ENTITLEMENT_SERVICE='APPLICATION_RUNTIME'
    ENTITLEMENT_PLAN='MEMORY'
    ENTITLEMENT_QUOTA='5'
    btp assign accounts/entitlement --to-subaccount $SUBACCOUNT_ID --for-service $ENTITLEMENT_SERVICE --plan $ENTITLEMENT_PLAN --amount $ENTITLEMENT_QUOTA

fi


cf login -a $API -o $ORG -s $SPACE -u $CF_USER -p $CF_PASS

cf cs papm-service default papm-service-default -c ./xs-broker-instance-config.json
cf csk papm-service-default sk-papm-service-default
cf cs application-logs lite applogs-lite
cf cs destination lite destination-lite

 
 