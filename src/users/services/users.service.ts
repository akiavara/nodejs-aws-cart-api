import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { Users as UsersEntity } from '../models/users.entity';
import { User } from '../models';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async findOne(name: string): Promise<UsersEntity> {
    return await this.userRepository.findOne({
      where: { name },
    });
  }

  async createOne({ name, password }: User): Promise<UsersEntity> {
    const id = randomUUID();

    const newUser = await this.userRepository.create({
      id,
      name,
      password,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }
}
