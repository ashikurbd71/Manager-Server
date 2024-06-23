import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_semister" })
export class SemisterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

}