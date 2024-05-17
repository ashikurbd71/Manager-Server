

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productSl: number;

  @Column()
  productName: string;

  @Column()
  productDetails: string;

  @Column()
  cost: number;

  @Column()
  sellAmount: number;
}
