import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './createUser.dto';
import { ForgotPasswordDto } from './dto/ForgotPasswordDto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('register')
  // async create(@Body() createUserDto: CreateUserDto) {
  //   await this.appService.create(createUserDto);
  //   return {
  //     status: HttpStatus.CREATED,
  //     message: 'User created',
  //   };
  // }

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<any> {
    try {
      await this.appService.register(userDto);
      return { statuscode: HttpStatus.CREATED, message: 'User created' };
    } catch (error) {
      return { statusCode: false, error: error.message };
    }
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const token = await this.appService.login(createUserDto);
    return {
      token,
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.appService.sendPasswordResetEmail(forgotPasswordDto);
    return {
      status: HttpStatus.OK,
      message: 'Password reset email sent',
    };
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Body('newPassword') newPassword: string,
    @Param('token') token: string,
  ) {
    await this.appService.resetPassword(newPassword, token);
    return {
      status: HttpStatus.OK,
      message: 'Password has been reset',
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
