import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorator';
import { User } from '../users/entities/user.entity';

/**
 * only return true, false
 * auth check (token check use graphql user context)
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    console.log('roles = ', roles);
    if (!roles) {
      return true;
    }
    //graphql context 에서 user 정보가지고온다
    // 해당 가드는 graphql resolver 가기전 체크 함
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    console.log('user = ', user);
    if (!user) {
      return false;
    }
    if (roles.includes('Any')) {
      return true;
    }
    return roles.includes(user.role);
  }
}
