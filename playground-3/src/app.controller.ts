import { Controller, Get, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
// import { a } from './barrel/a';
// import { b } from './barrel/b';
// import { c } from './barrel/c';
// import { a, b, c } from './barrel/barrel'; //barrel.ts를 통해 import문 리팩토링
import { a, b, c } from './barrel'; // index.ts로 하자.

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly catsService: CatsService,
  ) {
    console.log('AppController created!');
  }

  @Get()
  getHello(): string {
    // console.log(this.catsService.get());
    console.log('hi');
    return this.appService.getHello();
  }
}
