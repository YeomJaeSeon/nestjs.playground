import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { TeamEntity } from 'src/team/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => TeamEntity, (team) => team.users, { eager: true })
  @JoinColumn({
    name: 'team_id',
  })
  team: TeamEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn({
    name: 'profile_id',
  })
  profile: ProfileEntity;
}
