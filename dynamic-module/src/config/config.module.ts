import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';

/**
 * 모듈은 그룹화하는데 도와주는 디렉토리같은 녀석
 * 또 프로바이더나 컨트롤러를 포함하고, 해당 컴포넌트들을 위한 스코프나 실행컨텍슽르르 제공한다.
 *
 * 모듈에는 정적모듈 동적모듈이있는데
 * 정적모듈은 프로바이더의 구성에 변경을 동적으로(런타임 시간에) 줄 수 없다.
 * 동적모듈은 프로바이더의 구성에 변경을 동적으로 줄 수 있다.
 *
 * 왜 이게 필요한가?
 * DB설정같은 것들은 런타임에 동적으로 변경하는 것이 있으면 편하다. 수동으로 직접 코드를 수정하기보단, 단순히 설정을 식별할 토큰을 변경한뒤 서버를 실행하면
 * 동적모듈의 프로바이더의 구성이 변경되기 쉽기에
 *
 * DynamicModule타입을 리턴하면 된다.
 */
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
