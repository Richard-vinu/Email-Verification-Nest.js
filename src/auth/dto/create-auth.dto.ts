import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  
} from 'class-validator';


//import { IsUnique } from 'class-validator-unique-validator';

export enum IsVerified {
  TRUE = 'true',
  FALSE = 'false',
}

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
 // IsUnique;
  //@IsUnique({ message: 'Email $value already exists.' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  isVerified: IsVerified;
}
