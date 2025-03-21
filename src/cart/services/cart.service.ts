import { Injectable } from '@nestjs/common';
import { CartStatuses } from '../models';
import { PutCartPayload } from 'src/order/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts as CartEntity } from '../models/carts.entity';
import { CartItems as CartItemsEntity } from '../models/cart-items.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemsEntity)
    private readonly cartItemRepository: Repository<CartItemsEntity>,
  ) {}

  async findByUserId(userId: string): Promise<CartEntity> {
    // TODO: REMOVE IT AND USE CORRECT USER_ID
    const user_id_hardcoded = '6f1fc7a7-d12b-43fa-bacf-b42a19021c9f';
    const userCart = await this.cartRepository.findOne({
      where: { user_id: user_id_hardcoded },
      relations: {
        items: {
          product: true,
        },
      },
    });

    return userCart ? userCart : null;
  }

  async createByUserId(user_id: string): Promise<CartEntity> {
    console.log('createByUserId', user_id);
    // TODO: REMOVE IT AND USE CORRECT USER_ID
    const user_id_hardcoded = '6f1fc7a7-d12b-43fa-bacf-b42a19021c9f';
    const userCart = this.cartRepository.create({
      user_id: user_id_hardcoded,
      items: [],
      status: CartStatuses.OPEN,
    });

    const res = await this.cartRepository.save(userCart);

    return res;
  }

  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    payload: PutCartPayload,
  ): Promise<CartEntity> {
    const userCart = await this.findOrCreateByUserId(userId);

    const indexCartItem = userCart.items.findIndex(
      (cartItem) => cartItem.product.id === payload.product.id,
    );

    let upsertCartItem: CartItemsEntity;

    if (indexCartItem === -1) {
      // Create item
      upsertCartItem = this.cartItemRepository.create({
        count: payload.count,
        cart: userCart,
        product: payload.product,
      });
      await this.cartItemRepository.save(upsertCartItem);
    } else if (payload.count <= 0) {
      // Delete item
      await this.cartItemRepository.delete({
        cart: userCart,
        product: payload.product,
      });
    } else {
      // Update quantity
      upsertCartItem = {
        ...userCart.items[indexCartItem],
        count: payload.count,
      };
      await this.cartItemRepository.save(upsertCartItem);
    }

    return this.findOrCreateByUserId(userId);
  }

  async removeByUserId(userId) {
    const userCart = await this.findOrCreateByUserId(userId);

    if (!userCart) {
      throw new Error('Cart does not exist.');
    }

    this.cartRepository.remove(userCart);
  }
}
