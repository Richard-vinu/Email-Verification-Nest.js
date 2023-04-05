import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/create-user.dto';
// import { AuthService } from 'src/auth/auth.service';
import { AuthUserWithToken } from './dto/update-user.dto';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


    @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthUserWithToken> {
    const token = await this.userService.login(loginDto);
    return { token };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
