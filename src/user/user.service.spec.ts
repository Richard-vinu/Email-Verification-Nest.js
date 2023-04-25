import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  const mockUsersRepository = {
    const: jest.fn().mockImplementation(dto => dto),
    save:jest.fn().mockImplementation(user=>Promise.resolve({id:Date.now(),...user}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });  


it('should create a new user record and return that',async()=>{
expect(
  await service.create({ name:'marcus', password:'marcus@123' }),
).toEqual({
  id: expect.any(Number),
  name: 'marcus',
  password: 'marcus@123',
});
})

});
