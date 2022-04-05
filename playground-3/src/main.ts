import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.getHttpAdapter().getInstance().set('etag', false);

  await app.listen(3000);
}
bootstrap();
