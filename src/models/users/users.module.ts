import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import UsersController from '../../controllers/users.controller';
import { User, UserSchema } from './user.schema';
import { HashMiddleware } from '../../middleware/hash.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
