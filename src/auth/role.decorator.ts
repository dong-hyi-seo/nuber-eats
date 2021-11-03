import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

export type AllowedRoles = keyof typeof UserRole | 'Any';
export const Role = (roles: AllowedRoles[]) => {
  const ret = SetMetadata('roles', roles);
  console.log('ret = ', ret);
  return ret;
};
