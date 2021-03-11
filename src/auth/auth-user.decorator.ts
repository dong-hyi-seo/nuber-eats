import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Create Decorator (anotaion)
 * Auth decorator = thyemleaf Custoemr user 와 같다
 */
export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    //graphql context에 접근하여 인증 받은 유저의 정보를 가져온다.
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    return user;
  },
);
