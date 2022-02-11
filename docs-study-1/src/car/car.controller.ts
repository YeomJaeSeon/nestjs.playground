import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from 'src/config/config';
import { Connection } from './car.module';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  private connection: Connection;
  constructor(@Inject('CONNECTION') connection: Connection, private configService: ConfigService) {
    this.connection = connection;
  }

  @Get()
  getConnection() {
    console.log(this.connection.name);
    console.log(this.configService.config('hi'));
  }
}
