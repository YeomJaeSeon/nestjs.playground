import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './gurads/auth.guard';
import { NothingInterceptor } from './interceptors/nothing-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger) -> 미들웨어 전역으로 등록할 수 도 있다.
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new NothingInterceptor());
  await app.listen(3000);
}
bootstrap();
