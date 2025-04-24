import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'middleName', 'email', 'role', 'createdAt'],
      where: { isActive: true }
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: +id, isActive: true },
      select: ['id', 'firstName', 'lastName', 'middleName', 'email', 'role', 'createdAt']
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email: username, isActive: true }
    });
    return user || undefined;
  }

  async findByEsiaId(esiaId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { esiaId, isActive: true }
    });
    return user || undefined;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return result as User;
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findOne(id);
    const updated = Object.assign(user, updateUserDto);
    const savedUser = await this.userRepository.save(updated);
    const { password, ...result } = savedUser;
    return result as User;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    user.isActive = false;
    await this.userRepository.save(user);
  }
}
