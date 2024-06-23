
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "tbl_institute_name" })
export class InstituteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  shortName: string;

}
