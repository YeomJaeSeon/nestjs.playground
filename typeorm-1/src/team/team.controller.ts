import { Controller, Get, Param } from '@nestjs/common';
import { TeamEntity } from './entities/team.entity';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/specific/:id')
  findAllUsers(@Param('id') id: number): Promise<TeamEntity> {
    return this.teamService.findAllUsers(id);
  }

  @Get('/all')
  findAll(): Promise<TeamEntity[]> {
    console.log('진입');
    return this.teamService.findAll();
  }
}
