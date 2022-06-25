import { Body, Controller, Get } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  @Get()
  get(@Body('email') email: string) {
    return this.userService.get(email)
  }

  @Get('repository')
  getUser(@Body('email') email: string) {
    return this.userRepository.findOne(email)
  }


}
