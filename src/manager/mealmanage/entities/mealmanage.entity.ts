
import { MemberEntity } from "src/members/entities/member.entity";
import { DepartmentEntity } from "src/Setting/department/entities/department.entity";
import { InstituteEntity } from "src/Setting/institute/entities/institute.entity";
import { SemisterEntity } from "src/Setting/semister/entities/semister.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_meal" })
export class MealEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({  nullable: true,})
    addMoney: string;
    
    
    @Column({  nullable: true,})
    totalMeal: string;

    @Column({  nullable: true,})
    date: Date;

  
    @ManyToOne(() => MemberEntity, (ins) => ins.mealname,{  nullable: true,})
    @JoinColumn()
    member: MemberEntity;


    
    @Column({ nullable: true, default: 1 })
    status: number;
}
