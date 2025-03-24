import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Product } from 'src/products/models/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  count: number;

  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  @ManyToOne(() => Orders, (order) => order.items, { onDelete: 'CASCADE' })
  order: Orders;

  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  @ManyToOne(() => Product, { eager: true })
  product: Product;
}
