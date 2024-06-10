
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InstituteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

}
