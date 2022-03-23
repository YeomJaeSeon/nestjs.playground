import { Controller, Get, Inject } from '@nestjs/common';
import { DatabaseConnection } from './app.module';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
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
    // console.log(this.appService === this.appService2);
    console.log(this.config);
    console.log(this.value);

    return 'hello';
  }
}
