import { SmartSheetService } from '../smart-sheet/smart-sheet.service';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as logger from 'cf-nodejs-logging-support';

(async () => {
  try {
    ConfigModule.forRoot({ envFilePath: 'src/.env' });
    logger.info('Delete Data sources');
    const smartSheetService = new SmartSheetService();
    const alternative_con_via_destinations =
      await smartSheetService.sampleGetDataViaAPIAndGetAPIDetailsFromDestination();
    let conn = await smartSheetService.sampleGetDataBaseConnectionViaAPI();
    conn = alternative_con_via_destinations; // with destinations you can point to another tenant in any DC
    const dataSource = await new DataSource({
      type: 'sap',
      host: conn['d']['host'],
      port: conn['d']['port'],
      username: conn['d']['user'],
      password: conn['d']['password'],
      database: 'H00',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }).initialize();
    logger.info(JSON.stringify(conn));
    const queryRunner = await dataSource.createQueryRunner();
    const results = await queryRunner.manager.query(
      `SELECT * FROM "SAP_PAPM"."/NXI/TP1CONM" where conn_name NOT in (select conn_name from "SAP_PAPM"."/NXI/TP1FMB" union select conn_name from "SAP_PAPM"."/NXI/TP1FMT" UNION select conn_name from "SAP_PAPM"."/NXI/TP1FMR" UNION select conn_name from "SAP_PAPM"."/NXI/TP1FMV" );`,
    );
    for (const result of results) {
      logger.info('Deletion of ' + result.CONN_NAME);

      await smartSheetService.deleteConnectionAndGetAPIAccessFromDestination(
        result.CONN_NAME,
      );
    }
  } catch (err) {
    logger.error(err);
  }
})();
