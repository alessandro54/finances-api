import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { NewUserDto } from '../models/users/user.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('users')
export default class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/profile')
  async getProfile(@Request() req) {
    const createdUser: any = await this.userService.findBy({
      _id: req.user.id,
    });
    const { password, __v, ...user } = createdUser._doc;
    return user;
  }

  @Post()
  @Public()
  async create(@Body() payload: NewUserDto) {
    try {
      const createdUser: any = await this.userService.create(payload);
      const { password, ...user } = createdUser._doc;
      return user;
    } catch (e) {
      throw new HttpException((<Error>e).message, 400);
    }
  }
}
