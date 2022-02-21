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

  async findUsersWithSubquery(id: number): Promise<any> {
    const getRawAndEntities = await this.createQueryBuilder('team')
      .leftJoinAndSelect(
        (subQuery) => {
          return subQuery
            .from(UserEntity, 'ue')
            .where('ue.team = :id', { id })
            .limit(10)
            .offset(0);
        },
        't_user',
        't_user.team_id = team.id',
      )
      // .leftJoinAndSelect('t_user.profile', 'profile')
      .leftJoinAndSelect(
        (subQuery) => {
          return subQuery.from(ProfileEntity, 'pe');
        },
        't_profile',
        't_profile.id = t_user.profile_id',
      ) //서브쿼리의 alias는 서브쿼리를 조인하는 걸로 받아야 적용이됨.. leftJoinAndSelect(
      .where('team.id = :id', { id })
      .getRawAndEntities();
    console.log('//====== getRawAndEntities =======//');
    console.log(getRawAndEntities);

    const foundTeam = await this.createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('team.id = :id', { id })
      .getOne();

    console.log('//====== foundTeam =======//');
    console.log(foundTeam);

    const thirdSolution = await this.createQueryBuilder('team')
      .leftJoinAndMapMany(
        'team.users',
        (qb) => qb.from(UserEntity, 'user'),
        'user',
        'user.team_id = team.id',
      )
      .getRawMany();
    console.log('//====== thirdSolution =======//');
    console.log(thirdSolution);

    return foundTeam;
  }
}
