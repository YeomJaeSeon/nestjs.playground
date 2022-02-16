import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
// import { createDatabaseProviders } from './dattabase.providers';

@Module({
  providers: [DatabaseService]
})
export class DatabaseModule {
    // forRoot라는 static 메서드를 이용해서 동적 모듈을 만들수있다.
    // 동적모듈은 프로바이더를 동적으로 등록하고 설정하는 것이가능한 모듈을 의미한다.
    // static forRoot(entities = [], options?): DynamicModule{
    //     const providers = createDatabaseProviders(options, entities);
    //     return {
    //         module: DatabaseModule,
    //         providers: providers,
    //         exports: providers
    //     }
    // }
}
