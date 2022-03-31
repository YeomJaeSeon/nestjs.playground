import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeormService } from './typeorm.service';
import { SequlizeService } from './sequilize.service';

@Module({})
export class ConfigModule {
  //정적모듈은 @Module 파라미터에 프로바이더, 컨트롤러, import하는 모듈, export하는 프로바이더들을 지정했는데
  //정적메서드를 이용한다.
  static register(options: { type: string }): DynamicModule {
    //여기서 이것저것 동적으로 실행할수있는 코드를 작성하면됨
    const { type } = options;

    if (type === 'typeorm') {
      return {
        module: ConfigModule,
        providers: [TypeormService],
        exports: [TypeormService],
      };
    } else if (type === 'sequilize') {
      return {
        module: ConfigModule,
        providers: [SequlizeService],
        exports: [SequlizeService],
      };
    }
    return {
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
