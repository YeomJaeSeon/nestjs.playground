import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor() {
    console.log('etc setting complete');
  }
}
