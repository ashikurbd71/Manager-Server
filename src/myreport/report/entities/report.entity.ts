
import { MemberEntity } from 'src/members/entities/member.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: "tbl_report" })

export class ReportEntity  {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    totalTk: string;
    
    
    @Column()
    totalMeal: string;

    @Column()
    extraTk: string;

    @Column()
    comments: string;

    @Column()
    feedBack : string;

    @Column()
    reportStatus: string;

    @Column()
    date: Date;

    @ManyToOne(() => MemberEntity, (ins) => ins.bazrkariName)
    @JoinColumn()
    bazarKari: MemberEntity[];
 
    @Column()
    profile: string;

    
    @Column({ nullable: true, default: 1 })
    status: number;
}
