import { Injectable } from '@nestjs/common';

@Injectable()
export class SequlizeService {
  constructor() {
    console.log('sequilize setting complete');
  }
}
