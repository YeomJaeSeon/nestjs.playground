import { TeamEntity } from 'src/team/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'hello' })
export class HelloEntity {
  //   team_id: number;

  @PrimaryColumn('varchar', {
    name: 'name',
    length: 30,
  })
  name: string;

  @ManyToOne(() => TeamEntity, (team) => team.hellos)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;
}
