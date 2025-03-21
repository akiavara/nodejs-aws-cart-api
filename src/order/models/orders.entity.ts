import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderStatus } from '../type';
import { Users } from 'src/users/models/users.entity';

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
  delivery: Record<string, any>; // JSON field for delivery details

  @Column({ type: 'text', nullable: true })
  comments: string; // Optional comments field

  @Column({
    type: 'enum',
    enum: OrderStatus, // Enum for statuses
  })
  status: OrderStatus;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number; // Total amount for the order
}
