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
  Req,
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
import { Cat, CreateCatDto, CreateUserDto } from './dtos/create-cats.dto';
import { PassThroughPipe } from '../pipes/custom.pipe';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import Joi = require('joi');
import { AuthGuard } from 'src/gurads/auth.guard';
import { Request } from 'express';
import { ErrorsInterceptor, LoggingInterceptor, NothingInterceptor, ResponseTransformInterceptor } from 'src/interceptors/nothing-interceptor';
import { Auth, User } from 'src/decorators/user-decorator';

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
  @UseFilters(HttpExceptionFilter) //@UserFilter??????????????? ????????? ????????? ????????? catch??? ????????? ???????????? ???????????? ??????????????? ?????????????????????
  async createWithCustomFilter(@Body() CreateCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  @Get('pipe/:id')
  // ????????? ???????????? ??????????????? ??????????????? ????????? ???????????? ????????? ???????????? ????????? ??????????????? validation????????? transformation????????????, ParseIntPipe??? string -> number??? transformation?????????.
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
  @UsePipes(ParseIntPipe) // ????????? ????????? ??????????????? ???????????? ????????? ??? ??????.
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

  //dto ?????? ????????? -  Joi??????
  @Post('joi')
  @UsePipes(new JoiValidationPipe(catJoiSchema))
  dtoValidationWithjoi(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'success';
  }

  @Post('class-validator')
  // @UsePipes(ValidationPipe) //?????? ????????? Validation????????? ??????????????????.
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
    console.log('?????? ??????!');
    return 'success';
  }


  @Get('intercept')
  intercept(){
    console.log('controller')
    throw new HttpException({}, 400)
    return 'success'
  }

  @Auth()
  @Get('login')
  getUserInfo(@User() user: CreateUserDto){
    console.log(user)

    return 'success'
  }

  @UseGuards(AuthGuard)
  @Get('user-info-validation')
  getUserInfoValidation(@User('firstName', new ValidationPipe({validateCustomDecorators: true})) firstName: string): string{
    console.log(firstName)
    return 'success'
  }
}
