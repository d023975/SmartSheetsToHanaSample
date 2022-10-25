#!/bin/bash


yarn install --ignore-engines
yarn build

source scripts/credentials.sh

cf login -a "$API" -o "$ORG" -s "$SPACE" -u "$CF_USER" -p "$CF_PASS"


cf push -f app-config/manifest.yml \
                       --var app-route=$ROUTE  