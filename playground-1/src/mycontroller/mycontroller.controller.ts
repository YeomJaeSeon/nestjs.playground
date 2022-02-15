import { Controller, Get } from "@nestjs/common";

// module 에 컨트롤러 적용 안하면 Nest는 컨트롤러 인식못함
// 컨트롤러는 모듈에 종속되어있어야한다! 무족건!
@Controller('mycontroller')
export class MyController{
    @Get()
    myTest(): string{
        console.log("my test")
        return 'hi'
    }
}
