import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from 'src/exceptions/custom.exception';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CatsService } from './cats.service';
import { Cat, CreateCatDto } from './dtos/create-cats.dto';

// @UseFilters(HttpExceptionFilter)
@Controller({version: '2', path: 'cats'})
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    throw new Error()
    throw new ForbiddenException()
    return this.catsService.findAll();
  }

  @Get('test')
  async test(): Promise<string>{
    console.log('z')
    return this.catsService.test()
  }

  @Get('/error')
  async errorSituation(){
    // throw new UnauthorizedException
    throw new HttpException({first: 'yeom', last: 'seon'}, HttpStatus.NOT_FOUND)
  }

  @Get('/custom')
  async customError(){
    throw new CustomException() 
  }

  @Post('/custom-filter')
  @UseFilters(HttpExceptionFilter) //@UserFilter데코레이터 인자로 전달된 예외를 catch가 받아서 이것처것 처리하고 예외필터가 적용이되는구나
  async createWithCustomFilter(@Body() CreateCatDto: CreateCatDto){
      throw new ForbiddenException()
  }
}
