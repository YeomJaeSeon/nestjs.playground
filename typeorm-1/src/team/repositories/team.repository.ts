import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '../entities/team.entity';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {
  async findUsers(id: number): Promise<TeamEntity> {
    return await this.createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'user')
      .where('team.id = :id', { id })
      .getOne();
  }

  async findAll(): Promise<TeamEntity[]> {
    console.log('아니 시발');
    return await this.createQueryBuilder('team')
      .where('team.id >= :id', { id: 2 })
      .orderBy('team.name', 'ASC')
      .where('team.name = :name', { name: '리버풀' })
      .getMany();
  }
}
