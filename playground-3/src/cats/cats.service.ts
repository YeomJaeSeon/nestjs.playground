import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(REQUEST) private request: Request) {
    // 요청할때마다 인스턴스를 만드는 요청스코프에서 원본 요청객체 DI
    console.log('CatsService created!');
  }

  get() {
    return 'cats';
  }
}
