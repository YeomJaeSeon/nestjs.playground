import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor() {
    console.log('CatsService');
  }
  hello() {
    console.log('i am real catsservice hello');
  }
}
