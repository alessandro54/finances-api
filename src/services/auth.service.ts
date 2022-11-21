import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../models/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.userService.findBy({ username });
    if (!user) throw new Error('User not found');
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else throw new Error('Invalid password');
  }

  async login(
    payloadUsername: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const { _id, username, email } = await this.validateUser(
      payloadUsername,
      password,
    );
    return {
      access_token: this.jwtService.sign({
        sub: _id.toString(),
        username,
        email,
      }),
    };
  }
}
