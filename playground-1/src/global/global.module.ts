import { Global, Module } from '@nestjs/common';
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';

@Global()
@Module({
  providers: [GlobalService],
  exports: [GlobalService],
  controllers: [GlobalController]
})
export class GlobalModule {}
