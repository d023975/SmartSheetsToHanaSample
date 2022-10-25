import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { CFLoggerService } from './logger/cflogger.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { SmartSheetController } from './smart-sheet/smart-sheet.controller';
import { SmartSheetService } from './smart-sheet/smart-sheet.service';
import { ScopesGuard } from './scopes.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: (() => `config/${process.env.STAGE || 'prod-dev'}/.env`)(),
    }),
  ],
  controllers: [AppController, SmartSheetController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ScopesGuard,
    },
    AppService,
    CFLoggerService,
    SmartSheetService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('smartsheets*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
