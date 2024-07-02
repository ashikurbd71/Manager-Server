
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tbl_blood" })
export class BloodEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
    
    @Column({ nullable: true, default: 1 })
    status: number;

}
