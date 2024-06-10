
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BloodEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;


}
