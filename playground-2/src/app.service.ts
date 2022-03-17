import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/environment';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    this.configService.getEnvironment();
    return 'Hello World!';
  }
}
