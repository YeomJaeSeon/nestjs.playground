import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloEntity } from './entities/hello.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HelloEntity])],
})
export class HelloModule {}
