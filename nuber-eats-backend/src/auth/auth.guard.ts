import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorator';
import { User } from '../users/entities/user.entity';
import { JwtService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';

/**
 * only return true, false
 * auth check (token check use graphql user context)
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    /**
     * 아래 설명은 http, websocket(subscription) 서로 다른 통신 구현의 인증방법 변경에 관하여 설명
     */
    //graphql context 에서 user 정보가지고온다
    // 해당 가드는 graphql resolver 가기전 체크 함
    //gqlContext는 app.module.ts 의 graohql forRoot안에서 보낸 값을 담고있다 (현재 jwt token 만 가지고있음)
    //즉 여기서 jwtMiddleware역할을 해줘야함
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;
    if (token) {
      //token이 있는경우 decoding!
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user, ok } = await this.userService.findById(decoded['id']);
        if (!user) {
          return false;
        }
        gqlContext['user'] = user;
        if (roles.includes('Any')) {
          return true;
        }
        return roles.includes(user.role);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
