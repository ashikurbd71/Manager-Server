import { ManagerEntity } from "src/manager/manager/entities/manager.entity";
import { MemberEntity } from "src/members/entities/member.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_semister" })
export class SemisterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;
  
  @OneToMany(() => MemberEntity, (ict) => ict.semister)
  member: MemberEntity[];

  @OneToMany(() => ManagerEntity, (ict) => ict.semister)
  manager: ManagerEntity[];
  
  @Column({ nullable: true, default: 1 })
  status: number;

}