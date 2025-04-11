import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CartItems } from './cart-items.entity';
import { CartStatuses } from '.';
import { Users } from 'src/users/models/users.entity';

@Entity('carts')
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => Users, (user) => user.carts, { onDelete: 'CASCADE' }) // Define the ManyToOne relationship
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' }) // Map the user_id column
  user: Users;

  @OneToMany(() => CartItems, (item) => item.cart, { cascade: true })
  items: CartItems[];
}
