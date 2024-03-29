# SmartSheetsToHanaSample


- create app which is doing the following
  - access to https://smartsheet.redoc.ly/#section/API-Basics/HTTP-and-REST
    - can be done via oauth client credentials grant
      - destinations could be used to configure it on CF : https://help.sap.com/docs/CP_CONNECTIVITY/cca91383641e40ffbe03bdc78f00f681/7e306250e08340f89d6c103e28840f30.html
      - or use cups - use-provided service on CF to wrap access info
  - get DB connection to HANA DB:
      - https://<papm-cloud-api>/<Get DB credentials>
      - can be authorized va api access: https://help.sap.com/docs/SAP_PROFITABILITY_PERFORMANCE_MANAGEMENT_CLOUD/184efabaccdc4175b97223affaf7e5f8/09d3b74b678f42cca3d0af3193e3dd67.html?locale=en-US
        - access based on auth client credentials can be again configured within destinations
  - read the needed data from smart sheets
      - https://github.com/smartsheet-samples/node-read-write-sheet/blob/master/node-read-write-sheet.js
  - write data into hana database
      - use connection as mentioned above and write data to hana db
          - https://www.npmjs.com/package/@sap/hana-client
          - https://docs.nestjs.com/techniques/database
              - use  createConnection, getConnection   from 'typeorm'

                const credentials = {
                    type: 'sap',
                    host: hanaCredentials.host || '',
                    port: (hanaCredentials.port as unknown) || '',
                    username: hanaCredentials.user || '',
                    password: hanaCredentials.password || '',
                    database: this.configService.get<string>('DB_NAME') || 'H00',
                    name: tenantId,
                    schema: '',
                    encrypt: true,
                    synchronize: false,
                    logging: this.configService.get<string>('DB_LOG') || '["error" , "warn", "info", "log"]',
                    maxQueryExecutionTime: 5000,
                    pool: { min: 10, max: 20, requestTimeout: 10000 },
                    extra: { sslValidateCertificate: false },
                } as SapConnectionOptions;



  - schedule everything as a a task
      - https://docs.nestjs.com/techniques/task-scheduling
      - https://help.sap.com/docs/JOB_SCHEDULER/07b57c2f4b944bcd8470d024723a1631/22c2df4d22cb4a05af4c9502a67597ae.html?locale=en-US 

  - app does not need to run on cf. It can run everywhere - should be secure due to credential settings
    - cf specific parts need then 2 B replaced

  - alternatively implement a REST client from within Python or JS execution engine
    - issue: How to store credentials in a secure manner

 


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

