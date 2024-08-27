import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbl_image" })
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;
  
  @Column()
  profile: string ;

  @Column()
  user: string ;


  @Column()
  title: string;

  @Column({ nullable: true, default: 1 })
  status: number;
}
