import { Test, TestingModule } from '@nestjs/testing';
import { SmartSheetController } from './smart-sheet.controller';

describe('SmartSheetController', () => {
  let controller: SmartSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartSheetController],
    }).compile();

    controller = module.get<SmartSheetController>(SmartSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
