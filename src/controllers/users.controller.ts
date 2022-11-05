import { Body, Controller, Get, Post, HttpException, HttpCode } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { NewUserDto, UserLoginDto } from '../models/users/user.dto';
@Controller('users')
export default class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() payload: NewUserDto) {
    try {
      return await this.userService.create(payload);
    } catch (e) {
      throw new HttpException((<Error>e).message, 400);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() payload: UserLoginDto) {
    try {
      return await this.userService.login(payload);
    } catch (e) {
      throw new HttpException((<Error>e).message, 401);
    }
  }
}
