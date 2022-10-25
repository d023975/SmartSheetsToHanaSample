import { Controller, Get, UseGuards } from '@nestjs/common';
import { Scopes } from 'src/scopes.decorator';
import { ScopesGuard } from 'src/scopes.guard';
import { SmartSheetService } from './smart-sheet.service';

@Controller('smartsheets')
export class SmartSheetController {
  constructor(private readonly smartSheetService: SmartSheetService) {}
  @Scopes('read')
  @Get('jobstatus')
  async getJobStatus(): Promise<unknown> {
    return await this.smartSheetService.getJobStatus();
  }
}
