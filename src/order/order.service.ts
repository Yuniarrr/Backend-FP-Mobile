import { Injectable, NotFoundException } from '@nestjs/common';

import { StateOrder } from '@prisma/client';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type UpdateOrderDto, type CreateOrderDto } from './dto/index';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(createOrderDto: CreateOrderDto, tailor_user_id: string) {
    const isTailorExist = await this.findTailorFromUserId(tailor_user_id);
    const userId = await this.findUserIdByEmail(createOrderDto.email);

    if (!isTailorExist) {
      throw new NotFoundException('Tailor not found');
    }

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    if (new Date(createOrderDto.due_date) < new Date()) {
      throw new NotFoundException('Due date must be greater than today');
    }

    if (
      !Object.values(StateOrder).includes(createOrderDto.state as StateOrder)
    ) {
      throw new NotFoundException('State not found');
    }

    const order = await this.prisma.orders.create({
      data: {
        order_date: new Date(),
        tailor_id: isTailorExist,
        user_id: userId,
        due_date: createOrderDto.due_date,
        state: createOrderDto.state
          ? (createOrderDto.state as StateOrder)
          : 'PAYMENT',
        delivery_address: createOrderDto.delivery_address,
      },
    });

    return order;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const isOrderExist = await this.findOrderbyId(id);

    if (!isOrderExist) {
      throw new NotFoundException('Order not found');
    }

    if (new Date(updateOrderDto.due_date) < new Date()) {
      throw new NotFoundException('Due date must be greater than today');
    }

    if (
      !Object.values(StateOrder).includes(updateOrderDto.state as StateOrder)
    ) {
      throw new NotFoundException('State not found');
    }

    const order = await this.prisma.orders.update({
      where: { id: id },
      data: {
        delivery_address: updateOrderDto.delivery_address || undefined,
        due_date: updateOrderDto.due_date || undefined,
        state: updateOrderDto.state
          ? (updateOrderDto.state as StateOrder)
          : undefined,
      },
    });

    return order;
  }

  async findAll(user_id: string) {
    const user = await this.findRoleByUserId(user_id);

    if (user === 'USER') {
      const orders = await this.prisma.orders.findMany({
        where: { user_id: user_id },
      });

      return orders;
    } else if (user === 'TAILOR') {
      const tailorId = await this.findTailorFromUserId(user_id);

      const orders = await this.prisma.orders.findMany({
        where: { tailor_id: tailorId },
      });

      return orders;
    }
  }

  async findClothByOrderId(order_id: string) {
    const isOrderExist = await this.findOrderbyId(order_id);

    if (!isOrderExist) {
      throw new NotFoundException('Order not found');
    }

    const clothes = this.prisma.orderItems.findMany({
      where: { order_id: order_id },
      include: {
        Clothes: true,
      },
    });

    return clothes;
  }

  async findOrderDetailById(order_id: string) {
    const isOrderExist = await this.findOrderbyId(order_id);

    if (!isOrderExist) {
      throw new NotFoundException('Order not found');
    }

    const order = await this.prisma.orders.findUnique({
      where: { id: order_id },
    });

    return order;
  }

  async findTailorById(tailor_id: string) {
    const tailor = await this.prisma.tailors.findUnique({
      where: { user_id: tailor_id },
    });

    if (!tailor) {
      return false;
    }

    return true;
  }

  async findOrderbyId(id: string) {
    const order = await this.prisma.orders.findUnique({
      where: { id: id },
    });

    if (!order) {
      return false;
    }

    return true;
  }

  async findRoleByUserId(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: id },
    });

    return user.role;
  }

  async findTailorFromUserId(user_id: string) {
    const tailor = await this.prisma.tailors.findUnique({
      where: { user_id: user_id },
    });

    return tailor.id;
  }

  async findUserIdByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });

    return user.id;
  }
}
