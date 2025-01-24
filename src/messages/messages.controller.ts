import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Message> {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() message: Message): Promise<Message> {
    return this.messagesService.create(message);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() message: Message): Promise<Message> {
    return this.messagesService.update(id, message);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.messagesService.remove(id);
  }
}
