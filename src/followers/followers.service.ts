import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './followers.entity';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
  ) {}

  findAll(): Promise<Follower[]> {
    return this.followersRepository.find();
  }

  findOne(id: string): Promise<Follower> {
    return this.followersRepository.findOne(id);
  }

  async create(follower: Follower): Promise<Follower> {
    return this.followersRepository.save(follower);
  }

  async update(id: string, follower: Follower): Promise<Follower> {
    await this.followersRepository.update(id, follower);
    return this.followersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.followersRepository.delete(id);
  }
}
