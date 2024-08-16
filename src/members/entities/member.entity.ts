
import { MealEntity } from 'src/manager/mealmanage/entities/mealmanage.entity';
import { ReportEntity } from 'src/myreport/report/entities/report.entity';
import { BloodEntity } from 'src/Setting/blood/entities/blood.entity';
import { DepartmentEntity } from 'src/Setting/department/entities/department.entity';
import { InstituteEntity } from 'src/Setting/institute/entities/institute.entity';
import { SemisterEntity } from 'src/Setting/semister/entities/semister.entity';
import { UserEntity } from 'src/user/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: "tbl_member" })
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column()
  fatherNumber: string;

  @Column()
  motherNumber: string;

  @Column()
  brithCertifecate: string;

  @Column()
  number: string;


  @ManyToOne(() => InstituteEntity, (ins) => ins.member)
  @JoinColumn()
  instituteName: InstituteEntity;

  @Column()
  session: string;

  @ManyToOne(() => DepartmentEntity, (dep) => dep.member)
  @JoinColumn()
  department: DepartmentEntity;

  @Column()
  nid: string;

  @ManyToOne(() => BloodEntity, (bllod) => bllod.member)
  @JoinColumn()
  bloodGroup: BloodEntity;

  @Column()
  address: string;



  @ManyToOne(() => SemisterEntity, (semi) => semi.member)
  @JoinColumn()
  semister: SemisterEntity;

  @Column()
  email: string;

  @Column()
  joiningDate: Date;

  @Column()
  profile : string

  @OneToMany(() => MealEntity, (stockin) => stockin.member)
  mealname: MealEntity[];

  @OneToMany(() => ReportEntity, (stockin) => stockin.bazarKari)
  bazrkariName: ReportEntity[];

  @OneToMany(() => UserEntity, (user) => user.userName)
  userName: UserEntity;

  @Column({ nullable: true, default: 1 })
  status: number;
}
