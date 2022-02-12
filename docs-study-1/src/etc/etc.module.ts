import { Module } from '@nestjs/common';
import { EtcService } from './etc.service';

@Module({
  providers: [EtcService],
})
export class EtcModule {}
