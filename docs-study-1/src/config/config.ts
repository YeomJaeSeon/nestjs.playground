import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ConfigService {
  config(name: string): string {
    return 'config';
  }
}
