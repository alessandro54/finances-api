import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    body.password = await hashPassword(body.password);
    next();
  }
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
