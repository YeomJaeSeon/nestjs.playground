import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './dtos/create-cats.dto';

@Controller('cats')
export class CatsController {
    @Get('1') 
    findAll(@Req() request: Request): string{
        console.log(request)
        return 'hello1'
    }

    @Get('2')
    findAll2(request: Request): string{ // @Req사용안하면 undefined - 자바스크립트 변수에 아무것도 할당하지않았을때 자바스크립트 엔진이 해당 변수에 undefind(primitive type)을 할당해준돠!
        console.log(request);
        return 'hello2'
    }

    @Get('ap*e')
    findAllWithWildCard(@Req() req: Request): string{
        console.log(req);
        return 'wildcard hello'
    }

    @Post('post')
    // @HttpCode(400)// -> response status code custom가능
    postTest(): string{
        return 'post'
    }

    @Get('dynamic')
    dTest(@Query('id') id: number, @Res() res: Response): Response{
        console.log(`id: ${id}`)
        if(id == 1){
            return res.status(HttpStatus.ACCEPTED).json([])
        }else if(id == 2){ 
            return res.status(HttpStatus.BAD_GATEWAY).json([])
        }else if(id == 3){
            return res.status(HttpStatus.FOUND).json([]) 
        }
        return res.status(HttpStatus.CREATED).json([])
    }

    @Post('header')
    @Header('yeom', 'js')
    headerT(){
        return 'header'
    }

    @Get('docs')
    @Redirect('https://www.naver.com')
    rediT(){
        return 'redi'
    }

    @Post('body')
    bodyTTT(@Body() createCatDto: CreateCatDto){
        console.log(createCatDto)
        return createCatDto
    }
}
  