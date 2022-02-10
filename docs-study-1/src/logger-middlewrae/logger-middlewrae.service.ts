import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

// 미들웨어는 @Injectable()로 네스트 컨테이너에 프로바이더로 등록되어야 사용할수 있다.
@Injectable()
export class LoggerMiddlewraeService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
// 이렇게 클래스형기반으로 미들웨어를 만들었지만 함수로도 만들수있다.! 굳이 NestMiddlewrae 인터페이스 구현해서 메서드 사용할필요없는 간단한거면 함수로 미들웨어 구현하는것도 GOOD!
export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Function Middleware Request..');
  next();
};
