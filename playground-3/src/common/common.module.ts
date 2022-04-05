import { forwardRef, Module } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [forwardRef(() => CatsModule)],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
