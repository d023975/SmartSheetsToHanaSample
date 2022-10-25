import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JWTStrategy } from '@sap/xssec';
import type { Strategy } from 'passport';
import { getServices } from '@sap/xsenv';
import { ConfigService } from '@nestjs/config';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private middlewares: RequestHandler[];

  constructor(private readonly configService: ConfigService) {
    this.middlewares = this.getJwtMiddleware().reverse();
  }
  use(req: Request, res: Response, next: NextFunction) {
    (
      this.middlewares.reduce(
        (memo: NextFunction, middleware) => () => middleware(req, res, memo),
        next,
      ) as NextFunction
    )();
  }
  public getJwtMiddleware() {
    try {
      const XSUAA_SERVICE_NAME =
        process.env.XSUAA_APPLICATION || 'xsuaa-application';
      const xsuaa = getServices({ service: XSUAA_SERVICE_NAME }).service;
      const jwtStrategy = new JWTStrategy(xsuaa) as Strategy;
      passport.use(jwtStrategy);

      return [
        passport.initialize(),
        passport.authenticate('JWT', { session: false }),
      ] as RequestHandler[];
    } catch (error) {
      throw new HttpException(
        'Wrong environment configuration for JWT authentication method',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
