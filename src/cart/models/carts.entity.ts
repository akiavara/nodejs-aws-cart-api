import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItems } from './cart-items.entity';
import { CartStatuses } from '.';

@Entity('carts')
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'NOW()' })
  createdAt!: string;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'NOW()' })
  updatedAt!: string;

  @Column({
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN,
  })
  status: CartStatuses;

  @OneToMany(() => CartItems, (item) => item.cart, { cascade: true })
  items: CartItems[];
}
