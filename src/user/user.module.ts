import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmployeeEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  TypeOrmModule.forFeature([EmployeeEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
