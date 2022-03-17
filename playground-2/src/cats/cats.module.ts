import { Module } from '@nestjs/common';
import { CONNECTION } from 'src/common/constants';
import { connection } from 'src/connection';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const mockCatsService = {
  hello: () => {
    console.log('i am mockCatsService hello!');
  },
};

@Module({
  controllers: [CatsController],
  // providers: [CatsService]이 문법은 단축된것(표준방식의 프로바이더.. 그럼 커스텀 프로바이더는?). 사용하기 편하게 원래
  // 문법은 아래다.
  providers: [
    // {
    //   provide: CatsService, // 다른데서 DI할수있는 토큰이다.
    //   useClass: CatsService, //실제 클래스
    // },
    {
      provide: CatsService,
      useValue: mockCatsService, //useValue : 클래스 프로바이더가아닌 값 프로바이더
    },
    {
      provide: CONNECTION, //토큰을 문자열로 할수도있음 꼭 클래스로안해도됨. 대신 생성자 DI는 못함. 무조건 @Inject데코레이터를 이용해야함
      useValue: connection,
    },
  ],
})
export class CatsModule {}
