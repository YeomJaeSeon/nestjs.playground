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

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
    configServiceProvider,
  ],
  controllers: [CarController],
})
export class CarModule {}
