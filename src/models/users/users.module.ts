import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import UsersController from '../../controllers/users.controller';
import { User, UserSchema } from './user.schema';
import { HashMiddleware } from '../../middlewares/users/hash.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
