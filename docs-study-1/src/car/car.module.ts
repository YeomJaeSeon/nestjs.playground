import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { ConfigService } from 'src/config/config';
import { DevelopmentConfigService } from 'src/config/config-dev';
import { ProductionConfigService } from 'src/config/config-prod';

export type Connection = {
  name: string;
};

const connection: Connection = {
  name: 'mysql-database',
};

//클래스 프로바이더(useClass)
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService,
};

//참고로 settimeout은 Promise를 리턴하지 않는다..
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

//비동기적인 동작이라 해보자...
//팩토리 프로바이더를 통해서 비동기 프로바이더 만들수있따! - 비동기 작업 까지 어플리케이션이 시작하는걸 지연시키고 싶으면.. (ex 데이터베이스 연결 다되어야 서버 실행시키고싶으면 팩토리 프로바이더를 통해 async await으로 비동기 처리를 한다.!)
const nonAsyncModule = {
  provide: 'ASYNC_CONNECITON', //비동기 프로바이더이므로 DI토큰 을 이용해야하고 해당 프로바이더 주입할 땐 @Inject이용! (생성자 주입못한다 ~)
  useFactory: async () => {
    await wait(5000);
    return connection;
  },
};

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
    configServiceProvider,
    nonAsyncModule,
  ],
  controllers: [CarController],
})
export class CarModule {}
