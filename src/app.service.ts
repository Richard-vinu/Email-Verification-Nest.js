import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from './user.repository';
import { ForgotPasswordDto } from './dto/ForgotPasswordDto';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const isEmailUnique = await this.userRepository.isEmailUnique(email);
    if (!isEmailUnique) {
      throw new Error('Email address is already registered');
    }

    return this.userRepository.saveUser(email, password);
  }

  async login(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userRepository.findOne(createUserDto.email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async sendPasswordResetEmail(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.findUser(forgotPasswordDto.email);
    const { email } = forgotPasswordDto;
    if (!user) {
      throw new Error('User not found');
    }
    const resetToken = uuidv4();
    user.resetToken = resetToken;
    console.log(user.resetToken, '---copy this token');
    await this.userRepository.save(user);

    // const mailOptions = {
    //   to: email,
    //   subject: 'Password Reset',
    //   text: `Hello ${
    //     (user.email, user.id)
    //   },\n\nYou have requested to reset your password. Please use the following token to reset your password: ${resetToken}`,
    // };

    // await this.mailerService.sendMail(mailOptions);
  }

  async resetPassword(newPassword: string, token: string) {
    const user = await this.userRepository.findToken(token);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = newPassword;
    user.resetToken = null; // Clear the reset token

    await this.userRepository.save(user);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
