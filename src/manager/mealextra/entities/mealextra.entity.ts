import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "tbl_extramoney" })
export class MealextraEntity {


    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    extraMoney: string;

      
    @Column()
    date: Date;


      
    @Column()
    comments: string;


  
}
