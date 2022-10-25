import { Controller, Get } from '@nestjs/common';
import { SmartSheetService } from './smart-sheet.service';

@Controller('smartsheets')
export class SmartSheetController {
  constructor(private readonly smartSheetService: SmartSheetService) {}
  @Get('jobstatus')
  async getJobStatus(): Promise<unknown> {
    return await this.smartSheetService.getJobStatus();
  }
}
