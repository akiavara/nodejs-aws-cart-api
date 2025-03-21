import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Carts } from './carts.entity';
import { Product } from '../../products/models/product.entity';

@Entity('cart_items')
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Ensure this column exists

  @Column('int')
  count: number;

  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  @ManyToOne(() => Carts, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Carts;

  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  @ManyToOne(() => Product, { eager: true })
  product: Product;
}
