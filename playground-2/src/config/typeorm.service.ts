import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormService {
  constructor() {
    console.log('typeorm setting complete');
  }
}
