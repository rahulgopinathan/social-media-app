import { Test, TestingModule } from '@nestjs/testing';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';
import { Follower } from './followers.entity';

describe('FollowersController', () => {
  let controller: FollowersController;
  let service: FollowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowersController],
      providers: [
        {
          provide: FollowersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new Follower()),
            create: jest.fn().mockResolvedValue(new Follower()),
            update: jest.fn().mockResolvedValue(new Follower()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<FollowersController>(FollowersController);
    service = module.get<FollowersService>(FollowersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of followers', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should return a single follower', async () => {
    expect(await controller.findOne('1')).toEqual(new Follower());
  });

  it('should create a new follower', async () => {
    expect(await controller.create(new Follower())).toEqual(new Follower());
  });

  it('should update a follower', async () => {
    expect(await controller.update('1', new Follower())).toEqual(
      new Follower(),
    );
  });

  it('should delete a follower', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});
