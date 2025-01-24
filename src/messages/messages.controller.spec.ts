import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new Message()),
            create: jest.fn().mockResolvedValue(new Message()),
            update: jest.fn().mockResolvedValue(new Message()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of messages', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should return a single message', async () => {
    expect(await controller.findOne('1')).toEqual(new Message());
  });

  it('should create a new message', async () => {
    expect(await controller.create(new Message())).toEqual(new Message());
  });

  it('should update a message', async () => {
    expect(await controller.update('1', new Message())).toEqual(new Message());
  });

  it('should delete a message', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});
