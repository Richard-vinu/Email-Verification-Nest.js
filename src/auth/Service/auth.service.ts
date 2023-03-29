import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { AuthUser } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { EmailService } from './email.service';
import { randomBytes } from 'crypto';
import { FindOneOptions } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly userRepository: Repository<AuthUser>,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async createUser(createAuthDto: CreateAuthDto): Promise<AuthUser> {
    const { email, password } = createAuthDto;

      const options: FindOneOptions<AuthUser> = { where: { email } };

     const userExists = await this.userRepository.findOne(options);
     if (userExists) {
       throw new BadRequestException('Email already exists');
     }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new AuthUser();
    user.email = email;
    user.password = hashedPassword;

    // Generate verification token
    const token = randomBytes(16).toString('hex');
    user.verifyToken = token;

    const verificationLink = `http://localhost:3000/api/auth/verify/?token=${token}`;

    const emailContent = `Click <a href="${verificationLink}">here</a> to verify your account.`;
    await this.emailService.sendEmail(
      email,
      'Verify your account',
      emailContent,
      emailContent,
    );

    // if (this.userRepository.email)
    //   throw new NotFoundException(`email already exists`);

    return this.userRepository.save(user);
  }

  async confirmEmail(verifyToken: string): Promise<AuthUser> {
    const options: FindOneOptions<AuthUser> = { where: { verifyToken } };
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException(
        `User with verifyToken ${verifyToken} not found`,
      );
    }
    user.isEmailConfirmed = true;
     user.verifyToken = null;
    await this.userRepository.save(user);
    return;
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const options: FindOneOptions<AuthUser> = { where: { email } };

    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException('Email not verified');
    }

    const payload = { email: user.email, sub: user.id };
    const option = { expiresIn: '1h' };
    const secretKey = 'mysecretkey';
    const token = jwt.sign(payload, secretKey, option);
    return token;
  }

  findAll() {
    return `This action returns all auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
