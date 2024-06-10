import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class DepartmentEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    shortName: string
}
