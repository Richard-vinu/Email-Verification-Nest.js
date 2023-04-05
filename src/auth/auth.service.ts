// // import { Injectable, UnauthorizedException } from '@nestjs/common';
// // import { JwtService } from '@nestjs/jwt';
// // import { UserService } from 'src/user/user.service';
// // import { User } from 'src/user/entities/user.entity';
// // import { LoginDto } from 'src/user/dto/create-user.dto';

// // @Injectable()
// // export class AuthService {
// //   constructor(
// //     private readonly jwtService: JwtService,
// //     private readonly userService: UserService,
// //   ) {}

// //   async validateUser(email: string, password: string): Promise<User> {
// //     const user = await this.userService.findByEmail(email);

// //     if (user && user.comparePassword(password)) {
// //       return user;
// //     }

// //     return null;
// //   }

// //   async login(loginDto: LoginDto): Promise<{ access_token: string }> {
// //     const user = await this.validateUser(loginDto.email, loginDto.password);

// //     if (!user) {
// //       throw new UnauthorizedException('Invalid email or password');
// //     }

// //     const payload = { sub: user.id, email: user.email };

// //     return {
// //       access_token: this.jwtService.sign(payload),
// //     };
// //   }
// // }
// import {
//   Injectable,
//   UnauthorizedException,
//   BadRequestException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import * as bcrypt from 'bcrypt';
// import { compare } from 'bcrypt';
// import { randomBytes } from 'crypto';
// import { FindOneOptions } from 'typeorm';
// import { NotFoundException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { LoginDto } from 'src/user/dto/create-user.dto';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(AuthUser)
//     private readonly userRepository: Repository<AuthUser>,
//     private readonly emailService: EmailService,
//     private jwtService: JwtService,
//   ) {}

//   async login(loginDto: LoginDto): Promise<string> {
//     const { email, password } = loginDto;
//     const options: FindOneOptions<AuthUser> = { where: { email } };

//     const user = await this.userRepository.findOne(options);

//     if (!user) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     const isPasswordMatch = await compare(password, user.password);

//     if (!isPasswordMatch) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     if (!user.isEmailConfirmed) {
//       throw new UnauthorizedException('Email not verified');
//     }

//     const payload = { email: user.email, sub: user.id };
//     const option = { expiresIn: '1h' };
//     const secretKey = 'mysecretkey';
//     const token = jwt.sign(payload, secretKey, option);
//     return token;
//   }