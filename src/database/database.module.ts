import { Module } from '@nestjs/common';
import { SmartSheetService } from 'src/smart-sheet/smart-sheet.service';
import { databaseProviders } from './database.provider';
import { DatabaseController } from './database.controller';

@Module({
  providers: [...databaseProviders, SmartSheetService],
  exports: [...databaseProviders],
  controllers: [DatabaseController],
})
export class DatabaseModule {}
