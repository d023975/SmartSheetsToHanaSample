import { Module } from '@nestjs/common';
import { SmartSheetService } from 'src/smart-sheet/smart-sheet.service';
import { databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders, SmartSheetService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
