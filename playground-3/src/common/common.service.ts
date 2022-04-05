import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {
    console.log('CommonService created!');
  }
  get() {
    return this.catsService.get();
  }
}
