import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  // let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new User()),
            create: jest.fn().mockResolvedValue(new User()),
            update: jest.fn().mockResolvedValue(new User()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    // service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should return a single user', async () => {
    expect(await controller.findOne('1')).toEqual(new User());
  });

  it('should create a new user', async () => {
    expect(await controller.create(new User())).toEqual(new User());
  });

  it('should update a user', async () => {
    expect(await controller.update('1', new User())).toEqual(new User());
  });

  it('should delete a user', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});
