import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const authenticationWhiteList = ['GET /health'];
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const route = `${request.method} ${request.url}`;
    if (authenticationWhiteList.includes(route)) {
      return true;
    }
    if (!scopes) {
      return false;
    }

    return this.validateRequest(request, scopes);
  }

  private validateRequest(request, scopes: string[]): boolean {
    const { authorization = '' } = request.headers;
    const [type, token] = authorization.split(' ');
    if (!authorization || type !== 'Bearer' || !token) {
      return false;
    }
    const isAuthorized = scopes.some((scope) => {
      // const tenantId = request.authInfo.getZoneId();
      // request.logger.setTenantId(tenantId);
      // request.logger.info(`Checking scope ${scope} for tenant ${tenantId} `);

      return request.authInfo.checkLocalScope(scope);
    });

    return isAuthorized;
  }
}
