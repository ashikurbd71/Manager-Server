
import { MemberEntity } from "src/members/entities/member.entity";
import { DepartmentEntity } from "src/Setting/department/entities/department.entity";
import { InstituteEntity } from "src/Setting/institute/entities/institute.entity";
import { SemisterEntity } from "src/Setting/semister/entities/semister.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_meal" })
export class MealEntity {

    @PrimaryGeneratedColumn()
    id: number;
  

    @Column({ type: 'decimal', nullable: true })
    addMoney: String; 
  
    
    
    @Column({  nullable: true,})
    totalMeal: string;

    @Column({  nullable: true,})
    blance: string;


    @Column({  nullable: true, default :0 })
    eatMeal: string;


    @Column({  nullable: true, default : 0})
    loan: string;

   
    @Column({  nullable: true, default : 0})
    guest: string;
    


    @Column({  nullable: true,})
    date: Date;

    

  
   
 @ManyToOne(() => MemberEntity, (ins) => ins.mealname,{  nullable: true,})
    @JoinColumn()
    member: MemberEntity;
    
    
    @Column({ nullable: true, default: 1 })
    status: number;
}
