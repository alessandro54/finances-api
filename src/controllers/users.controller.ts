import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { NewUserDto } from '../models/users/user.dto';
@Controller('users')
export default class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() payload: NewUserDto) {
    return this.userService.create(payload);
  }
}
