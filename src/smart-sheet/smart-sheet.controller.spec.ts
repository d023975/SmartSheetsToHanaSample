import { Test, TestingModule } from '@nestjs/testing';
import { SmartSheetController } from './smart-sheet.controller';
import { SmartSheetService } from './smart-sheet.service';

describe('SmartSheetController', () => {
  let controller: SmartSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartSheetController],
      providers: [SmartSheetService],
    }).compile();

    controller = module.get<SmartSheetController>(SmartSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
