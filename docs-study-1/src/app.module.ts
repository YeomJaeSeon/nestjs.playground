import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

// CatModule은 자여스레 CatService프로바이더를 캡슐화한다..!!?! -- App모듈에서는 CatModule만 의존할뿐 export하는 프로바이더들이 뭔지 모르기 때문아닐까?
@Module({
  imports: [CatsModule], //AppModule에서 CatModule의 프로바이더를 사용해야한다면?!?!?! ---- 해당 CatModule의 프로바이더를 CatModule객체 옵션의 export를 해줘야 한다.
  // controllers: [AdminController, AppController, CatsController, DogController], // 모듈에서 컨트롤러를 존속시켜야 Nest는 인식할수 있음!
  // providers: [AppService, CatsService], // 이러한 프로바이더는 의존성 주입 DI가 가능하다!
  // // 위는 Nest Ioc 컨테이너에 공급자로 지정하는 코드임
})
export class AppModule {}
