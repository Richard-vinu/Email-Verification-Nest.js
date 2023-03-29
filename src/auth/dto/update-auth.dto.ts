import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}

import { AuthUser } from '../entities/auth.entity';

export interface AuthUserWithToken   {
  token: string;
}
// export interface AuthUserWithToken extends AuthUser {
//   token: string;
// }