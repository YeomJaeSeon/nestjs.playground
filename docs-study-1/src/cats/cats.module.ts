import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { EtcModule } from '../etc/etc.module';

// @Global() -- 모듈을 전역범위로.. - 모듈 전역화 하기보단 exports imports를 이용하자. - 어떤 모듈이 어던 모듈을 의존하고 어떤 프로바이더를 주입받을지 한눈에 알아보기 쉬우므로.
// Nest에서 모듈은 기본적으로 '싱글톤!!' -> 여러 모듈간의 동일한 공급자(Nest 인젝턴에의해 Nest Ioc에서 관리되는 프로바이더) 인스턴스를 손쉽게 공유할수있다.
// 또한 모든 모듈은 자동으로 공유 모듈
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 다른모듈에 프로바이더 인스턴스 공유! 모듈은 내부 공급자를 export하여 다른 모듈에서 사용하게 할수 있따
  // 다른모듈에 공유하고 싶은 provider는 exports해준다.
  //또한 exports는 providers 의 '하위집합'
})
export class CatsModule {
  constructor(private catService: CatsService) {} // 모듈클래스는 프로바이더 주입받을수있다 ㅋ.ㅋ
}

/**
 * 모듈 특징
 *
 * 1. 싱글턴이다. 그러므로 모듈간 프로바이더를 재사용 할수있다.
 * 2. 모듈은 기본적으로 shared 가 된다.
 * 모듈과 프로바이더
 * - 모듈은 프로바이더를 캡슐화한다. ( == 안에 숨긴다)
 * - A 모듈이 B모듈을 import만 할뿐 B모듈의 어떤 프로바이더를 사용할지는 모른다. 단순히 B모듈에서 exports가 되어있는 프로바이더만 사용할수있다.
 *
 * 모듈의 re-export
 *
 * A모듈이 B모듈을 import하고 동시에 export도 하면 제 3자인 C모듈이 A모듈을 import하기만 해도 B모듈을 사용할수있다.
 */
