import { Profile } from 'src/profile/entities/profile.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(type => Profile, (profile) => profile.user)
  profiles: Profile[]
}
