import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmployeeEntity } from './entities/user.entity';
import { FindOneOptions, Repository, FindOperator } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly empRepository: Repository<EmployeeEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<EmployeeEntity> {
    const employee = new EmployeeEntity();
    employee.userName = createUserDto.userName;
    employee.DOB = createUserDto.DOB;
    employee.email = createUserDto.email;
    employee.team = createUserDto.team;

    // any other properties that need to be set

    return this.empRepository.save(employee);
  }

  // async findForUser() {
  //   const isNotDeleted: FindOperator<boolean> = { $ne: true };
  //   return this.empRepository.find({ isDeleted: isNotDeleted });
  // }

  async findAll() {
    return this.empRepository.find();
  }

  async findOne(id: string) {
    const options: FindOneOptions<EmployeeEntity> = {
      where: { employ_id: id, isDeleted: false },
    };

    const user = await this.empRepository.findOne(options);

    // console.log(user);

    if (user.isDeleted) return 'user has been delete';

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const options: FindOneOptions<EmployeeEntity> = {
      where: { employ_id: id },
    };
    const user = await this.empRepository.findOne(options);

    if (!user) {
      throw new Error(`Entity  not found`);
    }
    user.userName = updateUserDto.userName;
    user.email = updateUserDto.email;
    user.DOB = updateUserDto.DOB;
    user.team = updateUserDto.team;
    return this.empRepository.save(user);
  }

  async remove(id: string) {
    // const options: FindOneOptions<EmployeeEntity> =
    //   { employ_id: id },
    // ;
    const user = await this.empRepository.softDelete({ employ_id: id });

    return `This action deleted the user `;
  }
}
