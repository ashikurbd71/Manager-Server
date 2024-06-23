
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "tbl_member" })
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  instituteName: string;

  @Column()
  department: string;

  @Column()
  nid: string;

  @Column({ nullable: true })
  bloodGroup: string;

  @Column()
  address: string;


  @Column()
  semister: string;

  @Column()
  email: string;

  @Column()
  joiningDate: Date;

  @Column()
  profile : string
}
