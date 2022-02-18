import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  appMiddleTest(): string{
    return 'app middle Test'
  }
}
