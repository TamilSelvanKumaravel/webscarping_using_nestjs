import { Injectable, NestMiddleware } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.path);
    if(req.path!='/scrap'){
      throw new BadRequestException('rout not found......')
    }
    next();
  }
}
