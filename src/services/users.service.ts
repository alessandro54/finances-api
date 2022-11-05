import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/users/user.schema';
import { NewUserDto, UserLoginDto, UserDto } from '../models/users/user.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    const findQuery = this.userModel.find().exec();
    const results = await findQuery;
    const count = await this.userModel.count();

    return { results, count };
  }

  async create(payload: NewUserDto) {
    if (_.isEmpty(payload)) throw new Error('You must provide a body');
    if (await this.checkEmailUniqueness(payload.email))
      throw new Error('Email already exists');
    return await this.userModel.create(payload);
  }

  async login(payload: UserLoginDto) {
    const { email, password } = payload;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) throw new Error('User not found');

    if (await bcrypt.compare(password, user.password)) return user;
    else throw new Error('Invalid password');
  }

  private async checkEmailUniqueness(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
