import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Ip,
  Next,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
// import { Request } from 'express';

let catServiceId = 1;

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {
    this.catsService.id = catServiceId++;
  } // 이렇게만해도 Nest DI컨테이너의 CatsService를 의존받을수있다. (CatsController는) - 생성자주입! 넘무 슾흐링이릉 비슷하다!
  // private에 주의하자!
  //Nest는 Typescript기반이므로 어떠한 타입이 파라미터로 올지 알수있어서 DI가 쉽다.! JAVA와 같다. 당연한 말인듯!? dynamic language 인 자스면 당연히 파라미터로 뭐가올지 모르니 DI할수가 없잖아.

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    console.log(this.catsService.id); //create메서드 호출할떄마다 (해당 메서드 요청할때마다) CatController 에서 주입받은 CatService객체(Nest컨테이너에 존재하는 프로바이더 -- 스프링빈과 매우유사) 싱글턴으로 존재함을 증명하는 코드
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // =================================== controller 개요에서 연습 ===========================//
  // @HttpCode(201) - 응답 코드 지정 가능
  // @Get('/:catId')
  // findAll(
  //   @Req() request,
  //   @Ip() ip,
  //   @Res() res,
  //   @Next() next,
  //   @Session() session,
  //   @Body() body,
  //   @Param('catId') catId: number, // path variable 경로변수
  //   @Query('name') name: string,
  // ): string {
  //   console.log(request); // express의 Request 객체 사용
  //   console.log('//===== @Ip =====//');
  //   console.log(ip);
  //   console.log('//===== @Res =====//');
  //   console.log(res);
  //   console.log('//===== @Next =====//');
  //   console.log(next);
  //   console.log('//===== @Session =====//');
  //   console.log(session);
  //   console.log('//===== request.session =====//');
  //   console.log(request.session);
  //   console.log('//===== @Body =====//');
  //   console.log(body);
  //   console.log('//===== request.body =====//');
  //   console.log(request.body);
  //   console.log('//===== @Param =====//');
  //   console.log(catId);
  //   console.log('//===== request.params =====//');
  //   console.log(request.params['catId']);
  //   console.log('//===== @Query =====//');
  //   console.log(name);
  //   console.log('//===== request.query =====//');
  //   console.log(request.query['name']);
  //   //NestJs는 기본적으로 express framework 사용하고 있음
  //
  //   return 'this action returns all cats';
  // }

  // @Post()
  // // @Header('Cache-Control', 'none') // 응답헤더에 key value를 넣을수 있슴.
  // @HttpCode(204) //Post 메서드 요청에 대한 default status code는 201이나 이렇게 상태코드를 변경해줄수있음
  // //추가로 204는 No Content이므로 response body에 아무것도 넣지않고 응답함 (문자열을 리턴해도)
  // create(): string {
  //   return 'this action adds a new cat';
  // }
  //
  // // == 라우트 와일드 카드 '*' == //
  // @Get('ab*cd')
  // @Redirect('https://nestjs.com') // 파라미터로 url, statuscode가 올수있눈데 statuscode는 default 302 (redirect)임.
  // findAll2() {
  //   return 'this route uses a wildcard';
  // }
  //
  // // == redirect할 url, statuscode 동적으로 결정하기 == //
  // @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)
  // getDocs(@Query('version') version: string) {
  //   if (version && version === '5') {
  //     // get : localhost:3000/cats/docs?version=5 이렇게 요청하면 https://docs.nestjs.com/v5/ 로 redirect된다.
  //     // 즉 동적으로 리다이렉션할 url을 지정할수 있쑴!
  //     return { url: 'https://docs.nestjs.com/v5/', code: 301 }; // -> 이 리턴 객체가 @Redirect 파라미터 재정의한다.
  //   }
  // }
  //
  // // == PathVariable, 경로변수, 경로 매개변수 == //
  // // @Get('/:id')
  // // findOne(@Param() params): string {
  // //   console.log(params.id);
  // //   return `This action returns a #${params.id} cat`;
  // // }
  //
  // // or @Param 데코레이터의 파라미터에 id를 넣어 바로 빼올수있다.
  // @Get('/findOne2/:id')
  // findOne2(@Param('id') id: string) {
  //   console.log(id);
  //   return `This action returns a #${id} cat`;
  // }
  //
  // // Promise를 리턴하는 비동기 - then or async await 으로 받아야함
  // @Get('promise')
  // async findAll3(): Promise<any[]> {
  //   return [];
  // }
  //
  // @Get('observable')
  // findAll(): Observable<any[]> {
  //   return of([]);
  // }
  //
  // // == request body데이터 받기 (dto로)
  // @Post('/request-body')
  // async createWithPost(@Body() createCatDto: CreateCatDto) {
  //   // Validation Pipe를 이용해서 요청 데이터 validation (유효성 검증)이 가능하다.
  //   console.log(createCatDto);
  //   console.log(`createCatDto : ${JSON.stringify(createCatDto)}`);
  //   return 'This action adds a new cat';
  // }
  //
  // // @Res()를 이용해서 응답 객체 생성
  // // @Res를 이용해서 응답하는 상태코드, 데이터를 응답할수 있다.
  // @Post('/res')
  // createRes(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send(); // HttpStatus 는 Enum이다.
  // }
  //
  // @Get('/res2')
  // findAllRes(@Res() res: Response) {
  //   res.status(HttpStatus.OK).json([]);
  // }

  // @Res단점
  // 1. 일단 단위테스트할때 문제가 있을수 있음. res객체의 여러 메서드들을 모킹해야함. (내가 원하는 테스트가 컨트롤러에 대한 테스트라면! 다른 의존성은 가져오지 않는것이 적절하다 생각한다.)
  // 2. 너무 유연하다. 내가 응답하는 형식을 모두 지정해야하므로 고려할사항이 많다. 비슷한 상황으론 express vs NestJS의 차이랄까?
}
