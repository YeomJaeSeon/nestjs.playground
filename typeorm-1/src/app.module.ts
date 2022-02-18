import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { TeamModule } from './team/team.module';
import { TeamEntity } from './team/entities/team.entity';
import { ProfileModule } from './profile/profile.module';
import { ProfileEntity } from './profile/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'prac',
      entities: [UserEntity, TeamEntity, ProfileEntity], // 사용할 entity의 클래스명을 넣어둔다.
      // synchronize: true, // false로 해두는 게 안전하다.
      logging: true,
    }),
    UserModule,
    TeamModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
