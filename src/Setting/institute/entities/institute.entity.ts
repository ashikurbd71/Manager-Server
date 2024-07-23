
import { ManagerEntity } from 'src/manager/manager/entities/manager.entity';
import { MemberEntity } from 'src/members/entities/member.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: "tbl_institute_name" })
export class InstituteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  shortName: string;

  @OneToMany(() => MemberEntity, (ict) => ict.instituteName)
  member: MemberEntity[];
 
  @OneToMany(() => ManagerEntity, (ict) => ict.instituteName)
  manager: ManagerEntity[];
  
  @Column({ nullable: true, default: 1 })
  status: number;
}
