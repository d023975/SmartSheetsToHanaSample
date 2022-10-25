import { Injectable } from '@nestjs/common';

@Injectable()
export class SmartSheetService {
  async getJobStatus(): Promise<unknown> {
    return { JobStatus: 'Active' };
  }
}
