import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UserController>(UserController);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = { name: 'marcus', password: 'marcus@123' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
      password: dto.password,
    });
  });

  
  it('should update a user', () => {
    const dto = { name: 'Marius' };

    expect(controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
    });
    expect(mockUsersService.update).toHaveBeenCalled();
  });
});
