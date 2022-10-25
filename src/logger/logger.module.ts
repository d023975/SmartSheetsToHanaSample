import { Global, Module } from '@nestjs/common';
import { CFLoggerService } from './cflogger.service';

@Global()
@Module({ providers: [CFLoggerService], exports: [CFLoggerService] })
export class LoggerModule {}
