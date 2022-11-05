import {
  Controller,
  Get
} from '@nestjs/common';
import { UsersService } from "../services/users/users.service";
@Controller('users')
export default class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
