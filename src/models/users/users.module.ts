import { Module } from '@nestjs/common';
import { UsersService } from "../../services/users/users.service";
import { MongooseModule } from '@nestjs/mongoose';
import UsersController from "../../controllers/users.controller";
import { User, UserSchema } from "./user.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}