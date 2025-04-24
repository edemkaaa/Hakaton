import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        firstName: username
      }
    });
    return user ?? undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });
    return user ?? undefined;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findByEsiaId(esiaId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { esiaId }
    });
    return user ?? undefined;
  }
}
