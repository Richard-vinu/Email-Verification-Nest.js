import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthService } from './Service/auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthUser } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
// AuthUserWithToken
import { AuthUserWithToken } from './dto/update-auth.dto';

import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
 
  ) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto): Promise<AuthUser> {
    const user = await this.authService.createUser(createAuthDto);
    return user;
  }

  @Get('verify')
  async findOne(@Query('token') Token: string) {
    //console.log(Token);

    await this.authService.confirmEmail(Token);
    return 'Verify done Successfully';
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthUserWithToken> {
    const token = await this.authService.login(loginDto);
    return { token };

    // //!this method from path Param
    // @Get('verify/:token')
    // async findOne(@Param('verifyToken') token: string) {
    //   console.log(token)
    //   const user = await this.authService.findByVerifyToken(token);
    //   if (!user) {
    //     throw new NotFoundException(`User with ID ${token} not found`);
    //   }
    //   return user;
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.authService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    //   return this.authService.update(+id, updateAuthDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.authService.remove(+id);
    // }
  }
}
