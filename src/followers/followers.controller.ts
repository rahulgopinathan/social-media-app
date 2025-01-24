import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { FollowersService } from './followers.service';
import { Follower } from './followers.entity';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Get()
  findAll(): Promise<Follower[]> {
    return this.followersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Follower> {
    return this.followersService.findOne(id);
  }

  @Post()
  create(@Body() follower: Follower): Promise<Follower> {
    return this.followersService.create(follower);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() follower: Follower,
  ): Promise<Follower> {
    return this.followersService.update(id, follower);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.followersService.remove(id);
  }
}
