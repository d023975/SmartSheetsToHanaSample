#!/bin/bash
source ../scripts/credentials.sh

cf login -a "$API" -o "$ORG" -s "$SPACE" -u "$CF_USER" -p "$CF_PASS"
cf push  
 






  