import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { ProfileRepository } from 'src/profile/repositories/profile.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/user.repository';
import { TeamEntity } from './entities/team.entity';
import { TeamRepository } from './repositories/team.repository';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamEntity,
      TeamRepository,
      UserEntity,
      UserRepository,
      ProfileEntity,
      ProfileRepository,
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
