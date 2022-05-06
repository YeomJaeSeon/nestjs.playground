# Mash up checklist

## Checklist
1. JWT가 무엇인지 설명할수 있나요?
- Json Web Token으로, 토큰기반 인증방식이다. 인증된 사용자에게만 서비스를 제공해야한다. 그런데, 매번 사용자의 민감한 정보인 아이디와 비밀번호를 매번 요청해야할까? 보안에도 좋지않고, 귀찮기도하다.(근데 jwt는 계속 토큰을 요청에 담아서 보내야하는데, 그런 관점에서 jwt 토큰인증방식이 덜 귀찮다고 할수있을까? ) 그래서 나온것이 토큰 기반 인증방식이고 그중 하나가 JWT이다.
- JWT는 Header, Payload, Verify Signature로 이루어져있다. Header에는 암호화할 알고리즘, 타입등이 들어가고, Payload는 서버에서 보낼 데이터가 들어간다. (유저의 아이디, 토큰 유효기간), 그리고 Verify Signature은 Base64방식으로 인코딩한 헤더와, 페이로드 그리고 SECRET KEY를 더한후 서명된다.
- JWT토큰을 이용하면 인증이 필요한 사용자에게만 제공하는 서비스에 대해서, 토큰만 유효하면 서비스를 제공해준다. 즉 매번 사용자의 아이디 비밀번호를 서버로 보내지 않아도된다.
- 사용자 A가 로그인 성공후 받은 jwt 토큰을 다른 사용자 B가 탈취하면? B사용자는 A사용자가 제공받으려는 서비스를 제공받을수 있다. (당연한것)
- 사용자 A가 로그인 성공후 받은 jwt토큰에 payload를 B사용자가 자신의 id를 넣으면? 서버는 처음에 verify signature를 검증하는데, A사용자의 payload기반으로 만들었기에 유효하지 않는 토큰으로 본다. 

> 아무튼 토큰 탈취당하면 큰일나긴하겠네

2. 특정 Route에 JWT인증을 걸어봅시다
- 로그인 성공한 유저만 이벤트를 받았나는 문자를 응답받는 서비스에 JWT인증을 걸어보자.
```typescript
  @UseGuards(JwtAuthGuard)
  @Get('event')
  getEvent(@Request() req) {
    return `${req.user.username}님 이벤트 당첨되었습니다!`;
  }
```
- 해당 라우트에 요청이 들어오면 `@nestjs/passport`의 AuthGuard에 의해, jwt strategy에 따라 validate함수가 실행이 되고, 요청 객체에 user를 넣고 반환한다.

## Advanced
1. 기존 인증 방식의 장/단점은 무엇일까요?
- 기존 인증방식이라고 하면 아이디, 비밀번호로 인증하는 것인가? 아무튼 그거라면, 인증이 필요한 서비스에 대해 매번 아이디와 비밀번호를 서버로 보내야한다. 아이디와 비밀번호는 민감한 정보인데 매번 네트워크를 통해 요청하는 것은 보안상 좋지못하다. 서버가 클라이언트가 요청한 아이디 비밀번호 계속 저장해놓으면되잖아? -> HTTP는 Stateless하기 때문에 불가능. 그게 아니라면 session 쿠키 방식으로 인증해도된다. 세션쿠키 방식으로 인증하면 서버의 세션 저장소(보통 레디스)에 로그인한 사용자의 정보가 저장되어있고 서버는 session id를 응답하고 클라이언트는 session id만 서버로 보내면된다. 세션아이디는 탈취당해도 괜찮다. 민감한 정보가 아니기 때문에.(당연히 탈취당하면 다른 사용자의 인증 서비스를 받을수 있긴하다.)

2. 더 강력한 인증 방식도 있을까요?
- 나는 세션 쿠키 인증방식을 알고 있는데, jwt는 어찌됐던, 사용자의 정보가 payload에 담기기 때문에 세션 쿠키보단 덜 안전하다고 생가한다. 세션 쿠키는 무조건 서버의 세션 저장소에 사용자의 정보가 담겨있기 때문에, 좀더 안전하다고 생각한다. 그러나 둘다 장단점이있다고생각함. 세션 쿠키는 jwt 토큰인증방식보다 안전한 대신 서버의 부하가 좀있을수 있겠다. 
3. 커스텀한 인증 Strategy를 만드려면 어떻게 해야할까요?
- PassportStrategy의 validate 메서드를 커스텀하게 재정의하면 되는거아닌감?
- 기존의 jwt strategy에 랜덤하게 2분의 1확률로 인증 성공하는 기능을 추가해보자

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret',
    });
  }

  async validate(payload: any) {
    const ranNum = Math.floor(Math.random() * 2);
    if (ranNum === 0) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username };
  }
}

```