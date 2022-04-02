import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AuthModule, ConfigModule.register({ folder: './config2' })], //정적모듈은 런타임에 프로바이더 구성에 아무런 변화를 줄수없음.
  //동적모듈은 가능하다. 이렇게 클래스를 넣는게아닌, static method를 호출함으로써. (imports에는 함수 호출결과를 넣을수도있네.)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
