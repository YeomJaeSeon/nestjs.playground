import { Controller, Get, Param } from '@nestjs/common';
import { TeamEntity } from './entities/team.entity';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/:id')
  findAllUsers(@Param('id') id: number): Promise<TeamEntity> {
    return this.teamService.findAllUsers(id);
  }

  @Get('/sub/:id')
  findAllUsersBySubQuery(@Param('id') id: number): Promise<TeamEntity> {
    return this.teamService.findAllUsersOfTeam(id);
  }
}
