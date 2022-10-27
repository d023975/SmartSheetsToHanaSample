import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Scopes } from 'src/scopes.decorator';
import { SmartSheetService } from './smart-sheet.service';

@Controller('smartsheets')
export class SmartSheetController {
  constructor(private readonly smartSheetService: SmartSheetService) {}
  @Scopes('read')
  @Get('jobstatus')
  async getJobStatus(): Promise<unknown> {
    return await this.smartSheetService.getJobStatus();
  }
  @Scopes('write')
  @Post('jobstatus')
  async createJob(): Promise<unknown> {
    return await this.smartSheetService.createJob();
  }
}
