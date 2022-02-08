import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Next,
  Param,
  Post,
  Query,
  Req,
  Res,
  Session,
} from '@nestjs/common';
// import { Request } from 'express';

@Controller('cats')
export class CatsController {
  // @HttpCode(201) - 응답 코드 지정 가능
  @Get('/:catId')
  findAll(
    @Req() request,
    @Ip() ip,
    @Res() res,
    @Next() next,
    @Session() session,
    @Body() body,
    @Param('catId') catId: number, // path variable 경로변수
    @Query('name') name: string,
  ): string {
    console.log(request); // express의 Request 객체 사용
    console.log('//===== @Ip =====//');
    console.log(ip);
    console.log('//===== @Res =====//');
    console.log(res);
    console.log('//===== @Next =====//');
    console.log(next);
    console.log('//===== @Session =====//');
    console.log(session);
    console.log('//===== request.session =====//');
    console.log(request.session);
    console.log('//===== @Body =====//');
    console.log(body);
    console.log('//===== request.body =====//');
    console.log(request.body);
    console.log('//===== @Param =====//');
    console.log(catId);
    console.log('//===== request.params =====//');
    console.log(request.params['catId']);
    console.log('//===== @Query =====//');
    console.log(name);
    console.log('//===== request.query =====//');
    console.log(request.query['name']);
    //NestJs는 기본적으로 express framework 사용하고 있음

    return 'this action returns all cats';
  }

  @Post()
  create(): string {
    return 'this action adds a new cat';
  }
}
