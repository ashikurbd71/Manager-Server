




import { ManagerEntity } from "src/manager/manager/entities/manager.entity";
import { MemberEntity } from "src/members/entities/member.entity";
;
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_chashout" })
export class CashoutEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => ManagerEntity, (ins) => ins.cashoutname,{  nullable: true,})
    @JoinColumn()
    managerName: ManagerEntity;
   
    @Column()
    amount: number;

    
    @Column()
    item: string;

    @Column()
    comment: string;

    @Column()
    date: Date;
   
  
    
    

}
