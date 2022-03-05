import {
  Body,
  Controller,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomException } from 'src/exceptions/custom.exception';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CatsService } from './cats.service';
import { Cat, CreateCatDto } from './dtos/create-cats.dto';
import { PassThroughPipe } from '../pipes/custom.pipe';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import Joi = require('joi');
import { AuthGuard } from 'src/gurads/auth.guard';
import { ErrorsInterceptor, LoggingInterceptor, NothingInterceptor, ResponseTransformInterceptor } from 'src/interceptors/nothing-interceptor';

const catJoiSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
}).options({ abortEarly: true, allowUnknown: true });

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// @UseFilters(HttpExceptionFilter)
// @UseGuards(AuthGuard)
@UseInterceptors(ErrorsInterceptor)
@Controller({ version: '2', path: 'cats' })
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    throw new Error();
    throw new ForbiddenException();
    return this.catsService.findAll();
  }

  @Get('test')
  async test(): Promise<string> {
    console.log('z');
    return this.catsService.test();
  }

  @Get('/error')
  async errorSituation() {
    // throw new UnauthorizedException
    throw new HttpException(
      { first: 'yeom', last: 'seon' },
      HttpStatus.NOT_FOUND,
    );
  }

  @Get('/custom')
  async customError() {
    throw new CustomException();
  }

  @Post('/custom-filter')
  @UseFilters(HttpExceptionFilter) //@UserFilter데코레이터 인자로 전달된 예외를 catch가 받아서 이것처것 처리하고 예외필터가 적용이되는구나
  async createWithCustomFilter(@Body() CreateCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  @Get('pipe/:id')
  // 핸들러 메서드가 실행되기전 미들웨어의 일종인 파이프는 핸들러 메서드에 전달된 파라미터를 validation하거나 transformation가능한데, ParseIntPipe는 string -> number로 transformation해준다.
  findOneUsePipe(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    console.log(typeof id);
    return 'success';
  }

  @Get('uuid/:uuid')
  findOne1(@Param('uuid', new ParseUUIDPipe({ version: '3' })) uuid: string) {
    console.log(uuid);
    return 'success';
  }

  @Get('query')
  findQuery(@Query('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return 'success';
  }

  @Get('method')
  @UsePipes(ParseIntPipe) // 라우팅 핸들러 메서드에도 파이프를 적용할 수 있다.
  findTest11(@Query('age') age: number) {
    console.log(typeof age);
    return 'success';
  }

  @Get('defaultvalue')
  findDefaultValuePipe(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    console.log(activeOnly);
    console.log(typeof activeOnly);
    console.log(page);
    console.log(typeof page);

    return 'success';
  }

  @Get('custom-pipe')
  customPipe(@Query('id', PassThroughPipe) id: number) {
    console.log(id);
    console.log(`type : ${typeof id}`);

    return 'success';
  }

  //dto 검증 파이프 -  Joi사용
  @Post('joi')
  @UsePipes(new JoiValidationPipe(catJoiSchema))
  dtoValidationWithjoi(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'success';
  }

  @Post('class-validator')
  // @UsePipes(ValidationPipe) //그냥 이렇게 Validation파이프 사용하면된다.
  dtoValidationWithClassValidator(@Body() createCateDto: CreateCatDto) {
    console.log(createCateDto);
    return 'success';
  }

  @Get('guard')
  @UseGuards(AuthGuard)
  useGuard() {
    return 'success';
  }

  @Get('meta')
  // @SetMetadata('roles', ['admin'])
  @Roles('admin')
  meta() {
    console.log('인가 성공!');
    return 'success';
  }


  @Get('intercept')
  intercept(){
    console.log('controller')
    throw new HttpException({}, 400)
    return 'success'
  }
}
