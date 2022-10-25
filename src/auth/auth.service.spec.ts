import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => {
  let service: AuthMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: (() => `test/test.env`)(),
        }),
      ],
      providers: [AuthMiddleware, ConfigService],
    }).compile();

    service = module.get<AuthMiddleware>(AuthMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return the jwt middleware ', () => {
    expect(service.getJwtMiddleware()).toBeDefined();
  });
});
