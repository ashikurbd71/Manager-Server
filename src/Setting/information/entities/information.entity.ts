import { MemberEntity } from "src/members/entities/member.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "tbl_Information" })
export class InformationEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
     phone: string;

     @Column()
     mealCharge: number;
     

}
