
export enum Team {
    FRONTEND="frontend",
    BACKEND="backend",
    FULLSTACK="fullstack"
}

export class CreateUserDto {
  employ_id: string;
  userName: string;
  email: string;
  DOB: Date;
  team: Team;
}
