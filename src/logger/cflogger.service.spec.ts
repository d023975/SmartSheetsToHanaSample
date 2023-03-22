import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CFLoggerService } from './cflogger.service';

describe('LoggerService', () => {
  let service: CFLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({})],
      providers: [CFLoggerService],
    }).compile();

    service = module.get<CFLoggerService>(CFLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
