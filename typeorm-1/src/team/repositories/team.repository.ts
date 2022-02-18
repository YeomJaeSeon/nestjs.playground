import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '../entities/team.entity';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {
  async findUsers(id: number): Promise<TeamEntity> {
    return await this.createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('team.id = :id', { id })
      .getOne();
  }

  async findUsersWithSubquery(id: number): Promise<TeamEntity> {
    const foundTeam = await this.createQueryBuilder('team')
      .leftJoinAndSelect(
        (subQuery) => {
          return subQuery
            .from(UserEntity, 'ue')
            .where('ue.team = :id', { id })
            .limit(10)
            .offset(10);
        },
        't_user',
        't_user.team_id = team.id',
      )
      .leftJoinAndSelect(
        (subQuery) => {
          return subQuery.from(ProfileEntity, 'pe');
        },
        't_profile',
        't_profile.id = t_user.profile_id',
      )
      .where('team.id = :id', { id })
      .getRawAndEntities();
    console.log(foundTeam);
    return foundTeam;
  }
}
