import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { Order } from '../models';
import { CreateOrderPayload, OrderStatus } from '../type';
import { Orders as OrdersEntity } from '../models/orders.entity';
import { OrderItem as OrderItemEntity } from '../models/order-items.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
  ) {}

  // Fetch all orders from the database
  async getAll(userId: string): Promise<OrdersEntity[]> {
    return await this.ordersRepository.find({
      where: { user: { id: userId } },
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

    try {
      // Start a transaction
      return await this.ordersRepository.manager.transaction(
        async (transactionalEntityManager) => {
          // Create the order
          const order = await transactionalEntityManager.save(OrdersEntity, {
            id,
            user: { id: data.userId },
            payment: {},
            address: data.address,
            orderItems: [],
            comments: data.address.comment ? data.address.comment : '',
            total: data.total,
            status: OrderStatus.Open,
          });

          // Then create and save the order items
          const orderItems = await Promise.all(
            data.items.map(async (cartItem) => {
              return await transactionalEntityManager.save(OrderItemEntity, {
                count: cartItem.count,
                order: order,
                product: cartItem.product,
              });
            }),
          );

          // Attach the items to the order
          order.orderItems = orderItems;

          // Return the fully populated order
          return order;
        },
      );
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
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
