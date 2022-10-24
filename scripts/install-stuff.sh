#!/bin/bash

# install things - 2B enhanced according 2 your needs

apt-get update\
    && apt-get install --no-install-recommends --assume-yes gnupg2 curl build-essential git ca-certificates gettext-base\
    && rm -rf /var/lib/apt/lists/*

#cf
curl --silent --location https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add -\
    && echo "deb https://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list\
    && apt-get update\
    && apt-get install --no-install-recommends --assume-yes cf7-cli\
    && chmod +x /usr/bin/cf\
    && rm -rf /var/lib/apt/lists/*

#node
curl --silent --location https://deb.nodesource.com/setup_16.x | bash -\
    && apt-get install --no-install-recommends --assume-yes nodejs\
    && npm install npm@latest -g\
    && rm -rf /var/lib/apt/lists/*

#yarn
curl --silent --location https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -\
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list\
    && apt-get update\
    && apt-get install --no-install-recommends --assume-yes yarn\
    && rm -rf /var/lib/apt/lists/*

#btp
curl\
        --silent\
        --location\
        --header "Cookie: eula_3_1_agreed=tools.hana.ondemand.com/developer-license-3_1.txt; path=/;"\
        "https://tools.hana.ondemand.com/additional/btp-cli-linux-amd64-2.10.0.tar.gz"\
    | tar -zx --strip-components=1 -C /usr/local/bin