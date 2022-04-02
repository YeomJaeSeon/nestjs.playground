import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  providers: [AuthService],
  exports: [AuthService, UserModule], //user module은 다시내보내기사용
})
export class AuthModule {}
