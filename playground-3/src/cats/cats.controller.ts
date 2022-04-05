import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller({ path: 'cats' })
export class CatsController {
  constructor(private readonly catsService: CatsService) {
    console.log('CatsController created!');
  }

  @Get()
  getHello(): string {
    console.log('cats controller');
    return this.catsService.get();
  }
}
