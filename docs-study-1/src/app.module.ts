import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AdminController } from './admin/admin.controller';
import { DogController } from './dog/dog.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [AdminController, AppController, CatsController, DogController], // 모듈에서 컨트롤러를 존속시켜야 Nest는 인식할수 있음!
  providers: [AppService, CatsService], // 이러한 프로바이더는 의존성 주입 DI가 가능하다!
  // 위는 Nest Ioc 컨테이너에 공급자로 지정하는 코드임
})
export class AppModule {}
