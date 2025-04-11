import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { Orders } from './models/orders.entity';
import { Users as UsersEntity } from 'src/users/models/users.entity';
import { OrderItem } from './models/order-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, UsersEntity, OrderItem])],
  providers: [OrderService],
  controllers: [],
  exports: [OrderService],
})
export class OrderModule {}
