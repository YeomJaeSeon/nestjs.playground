import { Controller, Get, HostParam } from '@nestjs/common';

// 하위 도메인 라우팅
//admin.localhost:3000 으로 요청하면 이 컨트롤러가 응답함. host: 이렇게 줘서 도메인을 다르게 할수있다!
@Controller({ host: 'admin.localhost' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }

  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
