import { Module } from '@nestjs/common';
import { GlobalModule } from 'src/global/global.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    imports: [GlobalModule], //global module은 아무데서나 import하면 어떠한 모듈에서도 임포트하지않아도 사용할수있따.(아무 모듈에서 꼭 한번은 import해야하는게 굉장히 어색하다.. 이걸 전역 모듈이라 할수있을까?)
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
}) 
export class CatsModule {
    constructor(private catsService: CatsService){}
} 
 