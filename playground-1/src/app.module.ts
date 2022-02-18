import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatMiddleWare } from './cats/cat.middleware';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { logger, LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CatsModule, CoreModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
//미들웨어는 @Module({})데코레이터를 통해서 적용하는게 아니군하!
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(logger, LoggerMiddleware, CatMiddleWare)
      .exclude({path: 'cats', method: RequestMethod.POST})
      // consumer.apply(LoggerMiddleware)
      .forRoutes({path: 'cats', method: RequestMethod.GET}) // forRoutes파라미터엔 라우팅 핸들러 한정
  }
} 
