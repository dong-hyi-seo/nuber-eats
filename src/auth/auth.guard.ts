import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * only return true, false
 * auth check (token check use graphql user context)
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    //graphql context 에서 user 정보가지고온다
    // 해당 가드는 graphql resolver 가기전 체크 함
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
