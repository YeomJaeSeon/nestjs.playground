import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Get()
  get() {
    console.log(this.commonService.get());
    return this.commonService.get();
  }
}
