import { Module, Scope } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

/**
 * 컨트롤러, 프로바이더
 * 그리고 모듈에서의 scope모두 테스트해보기
 */

@Module({
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
      // scope: Scope.REQUEST,
    },
  ],
  controllers: [CatsController],
  exports: [CatsService],
})
export class CatsModule {}
