import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { Order } from '../models';
import { CreateOrderPayload, OrderStatus } from '../type';
import { Orders as OrdersEntity } from '../models/orders.entity';
import { Users as UsersEntity } from 'src/users/models/users.entity';
import { OrderItem as OrderItemEntity } from '../models/order-items.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemsRepository: Repository<OrderItemEntity>,
  ) {}

  // Fetch all orders from the database
  async getAll(): Promise<OrdersEntity[]> {
    return await this.ordersRepository.find({
      relations: ['user'],
    });
  }

  // Find an order by its ID
  async findById(orderId: string): Promise<OrdersEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'items', 'items.product'], // Include related entities if needed
    });

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    return order;
  }

  async create(data: CreateOrderPayload): Promise<OrdersEntity> {
    const id = randomUUID() as string;

    // TODO: REMOVE IT AND USE CORRECT USER_ID
    const user_id_hardcoded = '6f1fc7a7-d12b-43fa-bacf-b42a19021c9f';

    const order = await this.ordersRepository.save({
      id,
      //user: { id: data.userId }, // Reference the user by ID
      user: { id: user_id_hardcoded }, // Reference the user by ID
      payment: {},
      address: data.address,
      orderItems: data.items,
      comments: data.address.comment ? data.address.comment : '',
      total: data.total,
      status: OrderStatus.Open,
    });

    // Then create and save the order items
    const orderItems = await Promise.all(
      data.items.map(async (cartItem) => {
        return await this.orderItemsRepository.save({
          count: cartItem.count,
          order: order,
          product: cartItem.product,
        });
      }),
    );

    // Attach the items to the order
    order.orderItems = orderItems;

    return order;
  }

  async update(orderId: string, data: Partial<Order>): Promise<OrdersEntity> {
    const order = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    // Update the order with new data
    const updatedOrder = await this.ordersRepository.save({
      ...order,
      ...data,
    });

    return updatedOrder;
  }

  async delete(orderId: string): Promise<DeleteResult> {
    const order = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    return await this.ordersRepository.delete({
      id: orderId,
    });
  }
}
