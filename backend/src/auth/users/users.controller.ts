import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './usres.service';
import { CreateUserDto } from '../dto/craet-user.tto';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
