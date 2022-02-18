import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repositories/user.repository';
import { TeamEntity } from './entities/team.entity';
import { TeamRepository } from './repositories/team.repository';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findAllUsers(id: number): Promise<TeamEntity> {
    return await this.teamRepository.findUsers(id);
  }

  async findAllUsersOfTeam(id: number): Promise<TeamEntity> {
    return await this.teamRepository.findUsersWithSubquery(id);
  }
}
