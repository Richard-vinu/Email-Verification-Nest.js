// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from 'src/user/dto/create-user.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
//     return await this.authService.login(loginDto);
//   }
// }
