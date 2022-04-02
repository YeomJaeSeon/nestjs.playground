import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';

@Module({})
export class ConfigModule {
  static register(options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS, // 파라미터로 받는 options를 값프로바이더로 설정해서, 같은 모듈의 프로바이더에서 이 값을 DI 받을 수 있다.
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
