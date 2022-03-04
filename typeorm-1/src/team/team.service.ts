import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './entities/team.entity';
import { TeamRepository } from './repositories/team.repository';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
  ) {}

  async findAllUsers(id: number): Promise<TeamEntity> {
    const teamInfo = await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.hellos', 'hellos')
      .where('team.id = :id', { id })
      .getOne();

    console.log(teamInfo);
    return teamInfo;
  }

  async findAll(): Promise<TeamEntity[]> {
    const teams = await this.teamRepository.findAll();
    console.log('//== teams == // ');
    console.log(teams);
    return teams;
  }
}
