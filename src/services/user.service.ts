import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/users/user.schema';
import { NewUserDto, UserLoginDto } from '../models/users/user.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    const findQuery = this.userModel.find().exec();
    const results = await findQuery;
    const count = await this.userModel.count();

    return { results, count };
  }

  async findBy(payload: FindParams): Promise<User | undefined> {
    return await this.userModel.findOne({ payload }).exec();
  }

  async create(payload: NewUserDto): Promise<User> {
    if (_.isEmpty(payload)) throw new Error('You must provide a body');
    if (await this.checkUniqueness(payload.username))
      throw new Error('Email already exists');
    return await this.userModel.create(payload);
  }

  private async checkUniqueness(attribute: string) {
    return this.findBy({ username: attribute });
  }
}

interface FindParams {
  Id?: string;
  email?: string;
  username?: string;
}
