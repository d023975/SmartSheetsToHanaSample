import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import * as logger from 'cf-nodejs-logging-support';

@Injectable()
export class CFLoggerService implements LoggerService {
  log(message: unknown, ...args: any[]): void {
    logger.info(message as string, ...args);
  }
  error(message: unknown, ...args: any[]): void {
    logger.error(message as string, ...args);
  }
  warn(message: unknown, ...args: any[]): void {
    logger.warn(message as string, ...args);
  }
  debug(message: unknown, ...args: any[]): void {
    logger.debug(message as string, ...args);
  }
  verbose(message: unknown, ...args: any[]): void {
    logger.verbose(message as string, ...args);
  }
}
