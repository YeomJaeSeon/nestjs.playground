import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from 'src/config/config';
import { Connection } from './car.module';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  private connection: Connection;
  private asyncConnection;
  constructor(
    @Inject('CONNECTION') connection: Connection,
    private configService: ConfigService,
    @Inject('ASYNC_CONNECITON') asyncConnection,
  ) {
    this.connection = connection;
    this.asyncConnection = asyncConnection;
  }

  @Get()
  getConnection() {
    console.log(this.connection.name);
    console.log(this.configService.config('hi'));
    console.log(this.asyncConnection);
  }
}
