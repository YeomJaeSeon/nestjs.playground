import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { CommonService } from './common/common.service';
import { GlobalService } from './global/global.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
    private readonly commonService: CommonService,
    private readonly globalService: GlobalService
    ) {}
 
  @Get()
  getHello(): string {
    console.log(this.commonService.common())
    return this.appService.getHello();
  }
}