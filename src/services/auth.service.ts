import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findBy({ username });

    if (!user) throw new Error('User not found');
    if (await bcrypt.compare(password, user.password)) return user;
    else throw new Error('Invalid password');
  }
  async login(user: { username: string; _id: Types.ObjectId }) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
