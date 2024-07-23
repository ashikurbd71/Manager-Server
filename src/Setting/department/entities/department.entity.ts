import { ManagerEntity } from "src/manager/manager/entities/manager.entity";
import { MemberEntity } from "src/members/entities/member.entity";
import { Column, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tbl_department_name" })
export class DepartmentEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    shortName: string

    @OneToMany(() => MemberEntity, (ict) => ict.department)
    member: MemberEntity[];

    
    @OneToMany(() => ManagerEntity, (ict) => ict.department)
    manager: ManagerEntity[];

    @Column({ nullable: true, default: 1 })
    status: number;
}
