import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/users/user.schema';
import { NewUserDto } from '../models/users/user.dto';
import * as _ from 'lodash';

type FindByPermittedParams = {
  _id?: string;
  email?: string;
  username?: string;
};

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    const findQuery = this.userModel.find().exec();
    const results = await findQuery;
    const count = await this.userModel.count();

    return { results, count };
  }

  async findBy(payload: FindByPermittedParams): Promise<User | undefined> {
    return await this.userModel.findOne(payload).exec();
  }

  async create(payload: NewUserDto): Promise<User> {
    if (_.isEmpty(payload)) throw new Error('You must provide a body');
    if (await this.checkUniqueness(payload))
      throw new Error('Username or email already taken');
    return await this.userModel.create(payload);
  }

  private async checkUniqueness({ username, email }) {
    return this.userModel.findOne({ $or: [{ username }, { email }] }).exec();
  }
}
