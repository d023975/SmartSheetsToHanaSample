import { ScopesGuard } from './scopes.guard';
import { Reflector } from '@nestjs/core';

describe('ScopesGuard', () => {
  it('should be defined', () => {
    const reflector = new Reflector();
    expect(new ScopesGuard(reflector)).toBeDefined();
  });
});
