import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.userService.get());
    console.log(this.authService.get());
    console.log(this.configService.get('MESSAGE'));
    return 'hello';
  }
}
