import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { logger, LoggerMiddlewraeService } from './logger-middlewrae/logger-middlewrae.service';
import { CarModule } from './car/car.module';

// CatModule은 자여스레 CatService프로바이더를 캡슐화한다..!!?! -- App모듈에서는 CatModule만 의존할뿐 export하는 프로바이더들이 뭔지 모르기 때문아닐까?
@Module({
  imports: [CatsModule, CarModule],
  controllers: [AdminController],
  //AppModule에서 CatModule의 프로바이더를 사용해야한다면?!?!?! ---- 해당 CatModule의 프로바이더를 CatModule객체 옵션의 export를 해줘야 한다.
  // controllers: [AdminController, AppController, CatsController, DogController], // 모듈에서 컨트롤러를 존속시켜야 Nest는 인식할수 있음!
  // providers: [AppService, CatsService], // 이러한 프로바이더는 의존성 주입 DI가 가능하다!
  // // 위는 Nest Ioc 컨테이너에 공급자로 지정하는 코드임
})
//이렇게 미들웨어를 적용할수 있다. 요청 -> (미들웨어) -> 컨트롤러
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger, LoggerMiddlewraeService) //이렇게 apply함수에 여러개의 미들웨어를 줘서 다중미들웨어도 가능!
      // .exclude() 요렇게 exclude할수도있음! spring에서 인터셉터 적용해본경험이있는데 비슷하다
      .forRoutes(CatsController); // 이렇게 오브젝트를 넣어 method도 지정해줄수있따 ~ cmp + p를 눌러서 확인해보자 파라미터가 뭐가올지
  }
}
