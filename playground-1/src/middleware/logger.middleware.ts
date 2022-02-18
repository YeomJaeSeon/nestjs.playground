import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request, Response } from "express";
 
//클래스로 만드는 커스텀 미들웨어 
@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: any, res: any, next: () => void) {
        console.log('(class middleware)Request ...')
        //next()를 호출하지 않으면 요청에 대한 응답이 종료되지 않음
        next()
    }
}

//function 커스텀 미들웨어

export function logger(req: Request, res: Response, next: NextFunction){
    console.log('(function middleware) Request...')
    next();
}