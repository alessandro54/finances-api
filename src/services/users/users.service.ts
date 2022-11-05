import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../models/users/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    const findQuery = this.userModel.find().exec();
    const results = await findQuery;
    const count = await this.userModel.count();

    return { results, count }
  }
}
