import { Module } from '@nestjs/common';
import { CarModule } from 'src/car/car.module';
import { CircleController } from './circle.controller';
import { CircleService } from './circle.service';

@Module({
  imports: [CarModule],
  controllers: [CircleController],
  providers: [CircleService],
})
export class CircleModule {}
