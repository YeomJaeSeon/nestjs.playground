import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// @Injectable()붙이면 Spring container에 스프링빈이 등록되는 것과같이(DI할수있는 스프링빈)
// Nest DI container에 등록이된다.. CatService가 Nest container에 등록이 되어있군하!
@Injectable() // 프로바이더로 정의된 녀석들은 Injectable데코레이터를 통해 DI할수있는 녀석들이 된다.
export class CatsService {
  private readonly cats: Cat[] = [];

  id: number;

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
