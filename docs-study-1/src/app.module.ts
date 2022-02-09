import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AdminController } from './admin/admin.controller';
import { DogController } from './dog/dog.controller';

@Module({
  imports: [],
  controllers: [AdminController, AppController, CatsController, DogController], // 모듈에서 컨트롤러를 존속시켜야 Nest는 인식할수 있음!
  providers: [AppService],
})
export class AppModule {}
