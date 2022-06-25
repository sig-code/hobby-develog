import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly repository: UsersRepository,
  ) { }

  get(email: string) {
    return this.userRepository.findOne(email)
  }

  async create(email: string, name: string) {
    const user = new User()
    user.email = email
    user.name = name
    return this.userRepository.save(user)
  }

  async update(email: string, name: string) {
    const user = new User()
    user.email = email
    user.name = name
    return this.userRepository.save(user)
  }

}
