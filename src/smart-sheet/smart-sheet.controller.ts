import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Scopes } from '../scopes.decorator';
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

  @Scopes('read')
  @Get('reports/:id')
  async getReports(@Param() params): Promise<unknown | undefined> {
    return await this.smartSheetService.getReports(params.id);
  }
}
