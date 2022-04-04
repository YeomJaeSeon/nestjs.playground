import { Controller, Get, Req, Scope } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';

@Controller({ path: 'cats' })
export class CatsController {
  constructor(private readonly catsService: CatsService) {
    console.log('CatsController created!');
  }

  @Get()
  getHello(@Req() req: Request): string {
    // console.log(req);
    // console.log('//==========================================//');
    // console.log('//==========================================//');
    // console.log('//==========================================//');
    // console.log('//==========================================//');

    return this.catsService.get();
  }
}
