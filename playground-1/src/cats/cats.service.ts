import { Injectable } from '@nestjs/common';
import { Cat } from './dtos/create-cats.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    console.log('cat service findall')
    return this.cats;
  }

  middleTest(): string{
    return 'cat service middle test'
  }

  async test(): Promise<string>{
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('hi')
      }, 3000);
    }) 
  }
}
