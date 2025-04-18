import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

import { Carts as CartEntity } from './models/carts.entity';
import { CartItems as CartItemEntity } from './models/cart-items.entity';
import { Users as UsersEntity } from 'src/users/models/users.entity';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([CartEntity, CartItemEntity, UsersEntity]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
