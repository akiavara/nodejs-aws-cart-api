import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { Orders } from './models/orders.entity';
import { Users as UsersEntity } from 'src/users/models/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, UsersEntity])],
  providers: [OrderService],
  controllers: [],
  exports: [OrderService],
})
export class OrderModule {}
