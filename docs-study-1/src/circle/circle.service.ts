import { Injectable } from '@nestjs/common';
import { CarService } from 'src/car/car.service';

@Injectable()
export class CircleService {
  constructor(private CarService: CarService) {}
}
