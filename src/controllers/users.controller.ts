import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { NewUserDto } from '../models/users/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('users')
export default class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    console.log(req);
    return req.user;
  }

  @Post()
  async create(@Body() payload: NewUserDto) {
    try {
      return await this.userService.create(payload);
    } catch (e) {
      throw new HttpException((<Error>e).message, 400);
    }
  }
}
