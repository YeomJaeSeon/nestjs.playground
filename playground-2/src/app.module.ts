import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DevelopmentConfigService } from './config/development';
import { ConfigService } from './config/environment';
import { ProductionConfigService } from './config/production';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV == 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
})
export class AppModule {}
