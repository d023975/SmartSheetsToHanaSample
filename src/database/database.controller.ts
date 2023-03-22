import { Controller, Get, Inject, Post } from '@nestjs/common';
import { Scopes } from '../scopes.decorator';
import { SmartSheetService } from '../smart-sheet/smart-sheet.service';
import { Env } from './entities/environment.entity';

@Controller('database')
export class DatabaseController {
  constructor(
    @Inject('DATA_SOURCE') private dbConn,
    private readonly smartSheetService: SmartSheetService,
  ) {}
  @Scopes('write')
  @Get('createEntry')
  async createJob(): Promise<unknown> {
    const data =
      await this.smartSheetService.sampleGetDataViaAPIAndGetAPIDetailsFromDestination();
    const sampleTabData = data['d'].Content.tab_env_kpi.TABLE;

    for (const line of sampleTabData) {
      const env = new Env();
      env.client = '123';
      env.envId = line.ENV_ID;
      env.ver = line.VER;
      env.seq = line.SEQ;
      env.penvId = line.PENV_ID;
      env.envType = line.ENV_TYPE;
      env.envState = line.ENV_STATE;
      env.dbcon = line.DBCON;
      env.rfcdest = line.RFCDEST;
      env.infoarea = line.INFOAREA;
      env.bpcEnvironment = line.BPC_ENVIRONMENT;
      env.callbackRfcdest = line.CALLBACK_RFCDEST;
      env.descr = line.DESCR;
      env.docu = line.DOCU;
      env.expanded = line.EXPANDED;
      env.isLeaf = line.ISLEAF;
      env.sampleContent = line.SAMPLE_CONTENT;
      this.dbConn.manager.save(env);
    }
    return 'DONE';
  }
}
