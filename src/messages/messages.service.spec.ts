import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';

describe('MessagesService', () => {
  let service: MessagesService;
  let repository: Repository<Message>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(Message),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    repository = module.get<Repository<Message>>(getRepositoryToken(Message));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of messages', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);
    expect(await service.findAll()).toEqual([]);
  });

  it('should return a single message', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(new Message());
    expect(await service.findOne('1')).toEqual(new Message());
  });

  it('should create a new message', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(new Message());
    expect(await service.create(new Message())).toEqual(new Message());
  });

  it('should update a message', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(new Message());
    expect(await service.update('1', new Message())).toEqual(new Message());
  });

  it('should delete a message', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
    expect(await service.remove('1')).toBeUndefined();
  });
});
