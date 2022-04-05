import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class CatsService {
  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {
    console.log('CatsService created!');
  }

  get() {
    // return this.commonService.get();
    return 'commonService';
  }
}
