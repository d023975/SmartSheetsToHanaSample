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
import { ApiService } from './api/api.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: (() => `config/${process.env.STAGE || 'prod-dev'}/.env`)(),
    }),
    DatabaseModule,
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
    ApiService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('smartsheets*');
    consumer.apply(AuthMiddleware).forRoutes('database*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
