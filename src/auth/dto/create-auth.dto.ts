import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export enum IsVerified {
  TRUE = 'true',
  FALSE = 'false',
}

export enum isAdmin {
  TRUE = 'true',
  FALSE = 'false',
}

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  isAdmin:isAdmin

  @IsNotEmpty()
  isVerified: IsVerified;
}
