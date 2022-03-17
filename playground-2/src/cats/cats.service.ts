import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  hello() {
    console.log('i am real catsservice hello');
  }
}
