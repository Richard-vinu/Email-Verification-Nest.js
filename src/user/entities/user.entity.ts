import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  setPassword(password: string): void {
    this.passwordHash = bcrypt.hashSync(password, 10);
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }
} 