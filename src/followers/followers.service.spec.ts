import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowersService } from './followers.service';
import { Follower } from './followers.entity';

describe('FollowersService', () => {
  let service: FollowersService;
  let repository: Repository<Follower>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowersService,
        {
          provide: getRepositoryToken(Follower),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FollowersService>(FollowersService);
    repository = module.get<Repository<Follower>>(getRepositoryToken(Follower));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of followers', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);
    expect(await service.findAll()).toEqual([]);
  });

  it('should return a single follower', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(new Follower());
    expect(await service.findOne('1')).toEqual(new Follower());
  });

  it('should create a new follower', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(new Follower());
    expect(await service.create(new Follower())).toEqual(new Follower());
  });

  it('should update a follower', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(new Follower());
    expect(await service.update('1', new Follower())).toEqual(new Follower());
  });

  it('should delete a follower', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
    expect(await service.remove('1')).toBeUndefined();
  });
});
