import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as log from 'cf-nodejs-logging-support';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private middlewares: RequestHandler[];
  constructor(private readonly configService: ConfigService) {
    this.middlewares = this.getLogMiddleware().reverse();
  }

  use(req: Request, res: Response, next: NextFunction) {
    (
      this.middlewares.reduce(
        (memo: NextFunction, middleware) => () => middleware(req, res, memo),
        next,
      ) as NextFunction
    )();
  }
  public getLogMiddleware() {
    try {
      return [log.logNetwork] as RequestHandler[];
    } catch (error) {
      throw new HttpException(
        'Wrong environment configuration logging method',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
