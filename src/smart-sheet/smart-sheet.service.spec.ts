import { Test, TestingModule } from '@nestjs/testing';
import { SmartSheetService } from './smart-sheet.service';

describe('SmartSheetService', () => {
  let service: SmartSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartSheetService],
    }).compile();

    service = module.get<SmartSheetService>(SmartSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
