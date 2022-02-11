import { Injectable } from '@nestjs/common';

@Injectable()
export class CarService {
  public findAllCars(): string {
    return 'findAllCars';
  }
}
