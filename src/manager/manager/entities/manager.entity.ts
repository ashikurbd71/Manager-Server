import { DepartmentEntity } from "src/Setting/department/entities/department.entity";
import { InstituteEntity } from "src/Setting/institute/entities/institute.entity";
import { SemisterEntity } from "src/Setting/semister/entities/semister.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_manager" })
export class ManagerEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
    
    
    @Column()
    number: string;

    @Column()
    position: string;
  
  
    @ManyToOne(() => InstituteEntity, (ins) => ins.manager)
    @JoinColumn()
    instituteName: InstituteEntity;

    @ManyToOne(() => DepartmentEntity, (dep) => dep.manager)
    @JoinColumn()
    department: DepartmentEntity;

    @ManyToOne(() => SemisterEntity, (semi) => semi.manager)
    @JoinColumn()
    semister: SemisterEntity;
  
    @Column()
    email: string;
  
    @Column()
    startDate: Date;
      
    @Column()
    endDate: Date;
  
    @Column()
    profile : string
    
    @Column({ nullable: true, default: 1 })
    status: number;
}
