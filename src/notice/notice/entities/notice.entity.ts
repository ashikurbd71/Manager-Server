import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_Notice" })
export class NoticeEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    assigner: string;
  
    @Column()
    position: string;
  
    @Column()
    date: Date;
  
    @Column()
    noticetitle: string;
  
    @Column()
    discription: string;
  
    @Column({ nullable: true, default: 1 })
    status: number;

}
