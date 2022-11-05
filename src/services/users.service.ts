import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/users/user.schema';
import { NewUserDto } from "../models/users/user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findAll() {
    const findQuery = this.userModel.find().exec();
    const results = await findQuery;
    const count = await this.userModel.count();

    return { results, count };
  }

  async create(payload: NewUserDto) {
    try {
      if (await this.checkEmailUniqueness(payload.email))
        throw new Error('Email already exists');
      return await this.userModel.create(payload);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  private async checkEmailUniqueness(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
