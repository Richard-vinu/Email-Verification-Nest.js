import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.setPassword(createUserDto.password);

    return  this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const options: FindOneOptions<User> = { where: { email } };

    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await compare(password, user.passwordHash);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }


    const payload = { email: user.email, sub: user.id };
    const option = { expiresIn: '1h' };
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(payload, secretKey, option);
    return token;
  }



  async findByEmail(email: string): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { email },
    };
    return await this.userRepository.findOne(options);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
