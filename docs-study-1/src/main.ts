import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { logger } from './logger-middlewrae/logger-middlewrae.service';

async function bootstrap() { 
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule); //Fastify
  const app = await NestFactory.create(AppModule);
  app.use(logger); //이렇게 그롤벌하게 미들웨어를 설정할수도 읬따! 
  app.getHttpAdapter().getInstance().set('etag', false); //etag disable
  // etag http 응답 헤더 : 특정 버전의 리소스 식별하는 식별자
  // 리소스 변경되었으면 해당 etag 응답 헤더를 통해 304 status code내려준다.

  app.enableShutdownHooks(); // 종료 훅 리스너 활성화하기 (종료훅리스너는 default가 비활성화이다.)

  await app.listen(3000);
}
bootstrap()
