import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  findAll(): Promise<Message[]> {
    return this.messagesRepository.find();
  }

  findOne(id: string): Promise<Message> {
    return this.messagesRepository.findOne(id);
  }

  async create(message: Message): Promise<Message> {
    return this.messagesRepository.save(message);
  }

  async update(id: string, message: Message): Promise<Message> {
    await this.messagesRepository.update(id, message);
    return this.messagesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.messagesRepository.delete(id);
  }
}
