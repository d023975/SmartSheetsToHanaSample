import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseController } from './database.controller';
import { databaseProviders } from './database.provider';
import { SmartSheetService } from '../smart-sheet/smart-sheet.service';

jest.setTimeout(50000);
describe('DatabaseController', () => {
  let controller: DatabaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: 'src/.env' })],
      controllers: [DatabaseController],
      providers: [...databaseProviders, SmartSheetService],
    }).compile();

    controller = module.get<DatabaseController>(DatabaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
