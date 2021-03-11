import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  /**
   * JWT token 발급
   * @param userId
   */
  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.options.privateKey);
  }

  /**
   * jwt token 해독
   * @param token
   */
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
