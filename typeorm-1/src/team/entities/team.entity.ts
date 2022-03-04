import { HelloEntity } from 'src/hello/entities/hello.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => HelloEntity, (hello) => hello.team)
  hellos: HelloEntity[];
}
