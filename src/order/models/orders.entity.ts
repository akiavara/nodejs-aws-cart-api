import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../type';
import { Users } from 'src/users/models/users.entity';
import { OrderItem } from './order-items.entity';

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(() => Users, { onDelete: 'CASCADE' }) // Foreign key to users
  user: Users;

  @Column({ type: 'json' })
  payment: Record<string, any>; // JSON field for payment details

  @Column({ type: 'json' })
  address: Record<string, any>; // JSON field for address details

  @Column({ type: 'text', nullable: true })
  comments: string; // Optional comments field

  @Column({
    type: 'enum',
    enum: OrderStatus, // Enum for statuses
  })
  status: OrderStatus;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number; // Total amount for the order
}
