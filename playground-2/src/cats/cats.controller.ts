import { Controller, Get, Inject } from '@nestjs/common';
import { CONNECTION } from 'src/common/constants';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject(CONNECTION)
    private connection,
  ) {}

  @Get()
  hello() {
    this.catsService.hello();
    this.connection.getConnection();
  }
}
