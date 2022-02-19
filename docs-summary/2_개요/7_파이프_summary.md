# 파이프
- 파이프는 `PipeTransform` 인터페이스를 구현하고 `@Injectable()` 데코레이터가 사용된 클래스이다.

## 왜 파이프 사용햄?
1. transformation(변환): 입력 데이터를 원하는 모양으로 변환
2. validation(유효성 검증): 입력 데이터가 유효한지 검증 (입력 데이터 잘못되었으면 예외를 발생시킨다.) (javax.validation과 유사)

## 파이프 동작과정
- 파이프는 미들웨어의 일종이기에, 핸들러 메서드가 요청을 받아 실행 되기 전에 실행된다. (핸들러가 실행되기전 파이프가 개입한다.)
- 파이프는 핸들로 메서드로 전달된 파라미터를 먼저 받아서, `transformation`하거나 `validation`을 한다.

> 파이프는 미들웨어의 일종! 이전에 했던 예외 필터도 미들웨어의 일종이다.

## 파이프 종류
- 파이프도 필터와 마찬가지로 네스트 자체에서 몇가지 파이프를 내장하고있고 원한다면 커스텀 예외 필터를 만든 것처럼 커스텀 파이프를 만들어 내가 원하는 형태로 `transformation`시키거나 `validation`할 수도 있다.

## 내장 파이프
- Nest에는 이미 존재하는 여러 내장 파이프가 있다.
- `ValidationPipe`
- `ParseIntPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `DefaultValuePipe`

(위 파이프들중 Parse로 시작하는 파이프들은 요청 데이터를 transformation하는데 사용된다.)
(한 예로, ParseIntPipe는 @Param()으로 전달되는 문자열 데이터를 number로 변환해준다. 만약 변환 실패하면 예외가 발생한다.)

## 파이프 등록

- 파이프를 사용하고 싶으면 **등록을 해야한다**
- 어떻게? 파이프 클래스나 클래스의 인스턴스를 사용하려는 컨텍스트에 바인드해야한다.
    - 커스텀 필터를 적용하기 위해 `@UseFilters()`데코레이터를 사용했었는데, 이때 데코레이터 파라미터에 클래스를 넣기도 했고 클래스의 인스턴스를 넣기도 했다. 클래스를 넣으면 네스트가 싱글턴으로 관리해 불필요한 인스턴스 생성을 막아줘서 메모리 관리를 간편하게 해주는 장점이 있다햇따. 그래서 클래스를 넣는걸 권장한다고 했다!

### 라우팅 핸들러의 파라미터에 파이프를 등록 
- 라우팅 핸들러 메서드의 파라미터에 파이프를 등록해 메서드의 파라미터로 들어오는 데이터에 파이프를 적용시킬수있다. (물론 파이프의 클래스를 사용하거나, 클래스의 인스턴스를 사용해서)

1. 클래스 사용
```typescript
  @Get('pipe/:id')
  findOneUsePipe(@Param('id', ParseIntPipe) id: number){
    console.log(typeof id);
    return 'success';
  }
```
- 파라미터로 들어오는 데이터 id를 number로 변화해준다. 만약 실패하면? id에 'abc'같은 문자열이 온다면 number로 casting불가능하잖아!?
- 파이프가 멋지게 예외를 응답한다. (핸들러 메서드 실해되지 않는다 이떈!)
- 그런데 내 입맛대로 예외 처리에 대한 응답을 내려주고 싶으면?
  - 핸들러 메서드의 파라미터에 클래스대신 인스턴스를 넣어보자

2. 인스턴스 사용
```typescript
  @Get('pipe/:id')
  findOneUsePipe(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number){
    console.log(typeof id)
    return 'success'
  }
```
- ParseIntPipe 를 통한 데이터 변환이 실패하면 기본으로 400 status code를 내려줬는데 이젠 406 status code를 내려준다. 이렇게 파이프 적용 실패로 예외가 발생했을때 내려주는 응답은 파이프 인스턴스를 이용해서 내가 커스텀할수 있다.

- 지금까지 핸들러 메서드의 파라미터에 `@Param()`을 이용해 경로변수 데이터만을 받는 경우만 적었는데 물론 `@Query()`를 이용해서 쿼리파라미터 데이터를 받아 파이프를 적용할 수도 있다.
  (물론 `@Body()`에 대해서도 파이프 적용가능)

### 라우팅 핸들러 수준으로 등록
- 이전 까진 핸들러 메서드의 파라미터 수준에서 파이프를 등록했는데 이젠 핸들러 메서드 수준에서 등록할수 있다.
- `@UsePipes()`데코레이터를 핸들러 메서드 자체에 등록하면 핸들러로 들어오는 모든 파라미터에 대해 작동한다.
> `UseFilters()`를 이용해서 커스텀 필터를 등록하는 것과 유사하돠~

### 컨트롤러 수준으로 등록
- 컨트롤러에 `UsePipes()`데코레이터를 등록할수있다. 그러면 이제 해당 컨트롤러의 모든 핸들러 메서드의 파라미터에 대해 작동하겠다.

### 전역으로 등록
- 파이프를 전역으로 등록할수도있다. 예외필터도, 파이프도 미들웨어이기에 전역으로 등록할수 있는것인가?
- 아무튼 `app.useGlobalPipes()`를 이용하여 적용할 수있다. (필터를 전역으로 등록하는 방법과 똑같다아이가!)
- 이렇게 되면 네스트 어플리케이션의 모든 핸들러 메서드의 파라미터에 대해 파이프 적용 가능!!

## 내장 validation 파이프
- 내장된 검증파이프는 그 자체로 옵션이 매우 다양하기에 유용하게 사용하자!
- `class-validator`과 내장 검증파이프는 매우 유사하다는데 class-validator는 라이브러리인가?
  - 찾아보니 class-validator는 typescript의 유효성을 검증해주는 라이브러리라고한다.

## 내장 transformation 파이프
- `Parse**Pipe`이다.
- 단순히 파라미터의 타입을 특정 타입으로 변환해주는 일만한다.

> 내장 validation 파이프던, 내장 trasnformation 파이프던 핸들럼 메서드가 실행되기 전에 검증을 하거나 데이터를 변환을 하는 작업을 한다.

## DefaultValuePipe
- validation파이프는 기본적으로 파라미터에 데이터가 있다는걸 전제로 작동한다. (없으면 예외가 발생한다.)
- 그러나 쿼리 파라미터같은 경우는 상황에 따라 데이터를 줄수도, 안줄수도 있다.
  - 예를들면 쿼리파라미터에 검색조건을 줄수도, 안줄수도 있다.
- 이떄 `DefaultValuePipe` 를 사용한다.

```typescript
  @Get('defaultvalue')
  findDefaultValuePipe(
      @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
      @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
  ){
    console.log(activeOnly)
    console.log(typeof activeOnly);
    console.log(page)
    console.log(typeof page)

    return 'success'
  }
```
- activeOnly 쿼리파라미터 없는 채로 요청하면 `DefaultValuePipe`에 의해 default로 false로 받아지고 `ParseBoolPipe`에 의해 boolean으로 형변환된다. 즉, **없는 데이터가 와 변환하는 과정에서 예외가 발생하지 않는다.**
- page 쿼리파라미터도 없는 채로 요청하면 default로 0으로 받는다.

## 커스텀 파이프
- 네스트에서 내장된 파이프만 써도 충분하지만 자신의 입맛대로 커스텀하게 파이프를 만들 수 있다.

```typescript
/**
 * ParseIntPipe 구현해보기
 */

@Injectable()
export class PassThroughPipe implements PipeTransform<string, number> { //Pipetransform은 지네릭이다. 첫번째는 요청 타입, 두번재는 응답 타입
  transform(value: string, metadata: ArgumentMetadata): any {
    //value: 현재 처리하려는 인자 입력값
    //metadata: 입력값에 대한 정보
    const val = parseInt(value, 10); //두번째 파라미터 radix 는 진수
    if (isNaN(val)){
      throw new BadRequestException('Validation failed')
      //HttpException상속받은 예외이므로 예외필터에 의해 예외처리가된다.
    }

    return val
  }
}
```
- ParseIntPipe와 기능이 같은 요청 데이터 string -> number로 형변환하는 커스텀 파이프를 만들었따.

## DTO 검증 파이프
- 요청 dto를 검증하자! 왜?
  1. 핸들러 메서드 내부에서 검증하면 메서드의 '단일 책임의 원칙'에 위배된다. 
  2. 데이터를 검증하는 클래스나 함수가 있으면 반복해서 재사용할 수 있다.(중복 줄인다!)

### Joi라이브러리로 검증

- `@types/joi` 라이브러리 설치하자!
- joi 오브젝트 스키마를 만들어서 적용하면된다.

### class-validator로 검증
- joi는 joi 스키마를 만들어야하는데, class-validator는 데코레이터를 기반으로 검증방법을 제공한다. (javax.validation)과 매우 유사하다.
- `class-validator`, `class-transformer`라이브러리를 설치해야한다.
- 다른 파이프들고 마찬가지로 전역 수준, 클래스 수준, 핸들러 메서드 수준, 핸들러 메서드 파라미터 수준에서 등록이 가능하다.