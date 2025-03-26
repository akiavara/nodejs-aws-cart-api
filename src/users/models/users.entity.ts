import { Carts } from 'src/cart/models/carts.entity';
import { Orders } from 'src/order/models/orders.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: false })
  is_admin: boolean;

  @OneToMany(() => Carts, (cart) => cart.user, { cascade: true }) // Reference the user property in Carts
  carts: Carts[];

  @OneToMany(() => Orders, (order) => order.user, { cascade: true })
  orders: Orders[];
}
