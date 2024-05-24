
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
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
  joiningDate: Date;
}
