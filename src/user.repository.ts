import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async isEmailUnique(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) return true;
    return false;
  }

  async saveUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }

  findToken(token: string): Promise<User> {
    return this.userRepository.findOne({
      where: { resetToken: token },
    });
  }

  findUser(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
