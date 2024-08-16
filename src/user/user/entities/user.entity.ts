import { ManagerEntity } from "src/manager/manager/entities/manager.entity";
import { MemberEntity } from "src/members/entities/member.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'tbl_users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => MemberEntity, (ins) => ins.userName)
    @JoinColumn()
    userName: MemberEntity;

    @ManyToOne(() => ManagerEntity, (ins) => ins.manager)
    @JoinColumn()
    manager: ManagerEntity;
  
    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    role: string;
  
    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true, default: 1 })
    status: number;
}
 