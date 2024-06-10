import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SemisterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

}