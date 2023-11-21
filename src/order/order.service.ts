import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type UpdateOrderDto, type CreateOrderDto } from './dto/index';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(
    createOrderDto: CreateOrderDto,
    tailor_id: string,
    user_id: string,
  ) {
    const isTailorExist = await this.findTailorById(tailor_id);

    if (!isTailorExist) {
      throw new NotFoundException('Tailor not found');
    }

    const order = await this.prisma.orders.create({
      data: {
        ...createOrderDto,
        order_date: new Date(),
        tailor_id: tailor_id,
        user_id: user_id,
      },
    });

    return order;
  }

  async updateOrderUser(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.orders.update({
      where: { id: id },
      data: {
        ...updateOrderDto,
      },
    });

    return order;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
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
}
