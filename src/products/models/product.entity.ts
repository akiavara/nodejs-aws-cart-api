import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Stock } from './stock.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Stock, (stock) => stock.product)
  stock: Stock;
}
