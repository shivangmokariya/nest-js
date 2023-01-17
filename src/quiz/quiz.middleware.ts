import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { async } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

@Injectable()
export class QuizMiddleware implements NestMiddleware {
  use(req: Request, Res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    // console.log(authorization);

    if (authorization) {
      const token = authorization.replace('Bearer ', '').replace('bearer ', '');
      // console.log('authorization: ' + authorization + token);
      try {
        const decoded = jwt.verify(token, 'secret-key-nestjs');
        console.log(decoded.id, 'decoded------------');
        next();
      } catch (e) {
        throw new HttpException('Unauthorized user-1', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Unauthorized user-2', HttpStatus.UNAUTHORIZED);
    }
  }
}
