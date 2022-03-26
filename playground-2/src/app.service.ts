import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from './config/environment';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  @Inject('ASYNC_CONNECTION')
  asyncConnection;

  getHello(): string {
    console.log(this.asyncConnection);
    return 'Hello World!';
  }
}
