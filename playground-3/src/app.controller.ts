import { Controller, Get, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {
    console.log('AppController created!');
  }

  @Get()
  getHello(): string {
    // console.log(this.catsService.get());
    return this.appService.getHello();
  }
}
