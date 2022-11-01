import { DataSource } from 'typeorm';
import { SmartSheetService } from '../smart-sheet/smart-sheet.service';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const smartSheetService = new SmartSheetService();
      const conn = await smartSheetService.sampleGetDataBaseConnectionViaAPI();
      const dataSource = new DataSource({
        type: 'sap',
        host: conn['d']['host'],
        port: conn['d']['port'],
        username: conn['d']['user'],
        password: conn['d']['password'],
        database: 'H00',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
