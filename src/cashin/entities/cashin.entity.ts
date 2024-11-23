




;
import { MemberEntity } from "src/members/entities/member.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_chasin" })
export class CashinEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
   
    @Column()
    amount: number;

    
    @Column()
    code: string;

    @Column()
    date: Date;
   
  
    
    

}
