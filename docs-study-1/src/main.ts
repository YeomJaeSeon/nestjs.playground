import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().set('etag', false); //etag disable
  // etag http 응답 헤더 : 특정 버전의 리소스 식별하는 식별자
  // 리소스 변경되었으면 해당 etag 응답 헤더를 통해 304 status code내려준다.
  await app.listen(3000);
}
bootstrap();
