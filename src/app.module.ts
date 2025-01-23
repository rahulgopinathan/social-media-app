import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';
import { FollowersController } from './followers/followers.controller';
import { FollowersModule } from './followers/followers.module';

@Module({
  imports: [UsersModule, MessagesModule, FollowersModule],
  controllers: [AppController, FollowersController],
  providers: [AppService, MessagesService],
})
export class AppModule {}
