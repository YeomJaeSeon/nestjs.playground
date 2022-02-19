import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger) -> 미들웨어 전역으로 등록할 수 도 있다.
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
