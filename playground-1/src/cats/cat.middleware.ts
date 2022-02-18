import { Injectable, NestMiddleware } from "@nestjs/common";
import { AppService } from "src/app.service";
import { CatsService } from "./cats.service";

@Injectable()
export class CatMiddleWare implements NestMiddleware{
    //클래스형 미들웨어도 컨트롤러나 프로바이더처럼 다른 의존성을 주입할수있다.
    constructor(private catService: CatsService, private appService: AppService){}

    use(req: any, res: any, next: () => void) {
        console.log('cat middleware')
        console.log(this.catService.middleTest())
        console.log(this.appService.appMiddleTest())
        next();
    }
}