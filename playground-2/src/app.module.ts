import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DevelopmentConfigService } from './config/development';
import { ConfigService } from './config/environment';
import { ProductionConfigService } from './config/production';
type OptionProviderType = {
  get: () => number;
};

const optionsProvider = {
  get: () => Math.floor(Math.random() * 2), // 0 <= random <= 1
};

export class DatabaseConnection {
  dbms: string;
  constructor(type: number) {
    console.log('DatabaseConnection constructor');
    if (type === 0) {
      this.dbms = 'mysql2';
    } else {
      this.dbms = 'sqlite3';
    }
  }

  toString() {
    return this.dbms;
  }
}

const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
  },
};

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'AliasedAppService',
      useExisting: AppService,
    },
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV == 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    }, //위에도 어떻게 보면 동적으로 프로바이더를 주입하지만 완전히 동적이진 않다. useFactory를 통홰 완전히 동적인 프로바이더를 주입해보자.
    //
    {
      provide: 'DBMS',
      useFactory: () => {
        //useFactory 를 이용해 DI할 프로바이더를 완전히 동적으로 생성할수있다.
        //런타임에, 네스트 실행될때 DI할 프로바이더가 정해진다.
        const options = optionsProvider.get();
        return new DatabaseConnection(options);
      },
    },
    configFactory,
  ],
})
export class AppModule {}
