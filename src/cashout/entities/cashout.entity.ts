




import { ManagerEntity } from "src/manager/manager/entities/manager.entity";
import { MemberEntity } from "src/members/entities/member.entity";
;
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_chashout" })
export class CashoutEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
   
    @Column()
    amount: number;

    

    @Column()
    code: string;

    @Column()
    comment: string;

    @Column()
    date: Date;
   
  
    
    

}
