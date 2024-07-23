
import { MemberEntity } from "src/members/entities/member.entity";
import { Column, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tbl_blood" })
export class BloodEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @OneToMany(() => MemberEntity, (ict) => ict.bloodGroup)
    member: MemberEntity[];
    
    @Column({ nullable: true, default: 1 })
    status: number;

}
