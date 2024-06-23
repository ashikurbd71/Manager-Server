import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tbl_department_name" })
export class DepartmentEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    shortName: string
}
