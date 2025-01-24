import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);
    expect(await service.findAll()).toEqual([]);
  });

  it('should return a single user', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(new User());
    expect(await service.findOne('1')).toEqual(new User());
  });

  it('should create a new user', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(new User());
    expect(await service.create(new User())).toEqual(new User());
  });

  it('should update a user', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(new User());
    expect(await service.update('1', new User())).toEqual(new User());
  });

  it('should delete a user', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
    expect(await service.remove('1')).toBeUndefined();
  });
});
