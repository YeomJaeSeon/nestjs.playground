import { forwardRef, Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CommonModule } from 'src/common/common.module';

/**
 * 컨트롤러, 프로바이더
 * 그리고 모듈에서의 scope모두 테스트해보기
 */

@Module({
  imports: [forwardRef(() => CommonModule)],
  providers: [CatsService],
  controllers: [CatsController],
  exports: [CatsService],
})
export class CatsModule {}
