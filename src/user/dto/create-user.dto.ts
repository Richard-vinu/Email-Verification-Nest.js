
export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  // readonly role:string

}



export class LoginDto {
  readonly email: string;
  readonly password: string;
}