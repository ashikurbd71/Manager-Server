



import { MemberEntity } from "src/members/entities/member.entity";
;
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_chasin" })
export class CashinEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => MemberEntity, (ins) => ins.cashinname,{  nullable: true,})
    @JoinColumn()
    studentName: MemberEntity;
   
    @Column()
    amount: number;

    
    @Column()
    code: string;

    @Column()
    date: Date;
   
  
    
    

}
