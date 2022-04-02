import { Controller, Get, Inject } from '@nestjs/common';
import { DatabaseConnection } from './app.module';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}
  @Inject('DBMS')
  dbms: DatabaseConnection;
  @Inject('AliasedAppService')
  appService2: AppService;
  @Inject('CONFIG')
  config;
  @Inject('VALUE')
  value;

  @Get()
  getHello(): string {
    this.appService.getHello();
    this.configService.getEnvironment;
    return 'hello';
  }
}
