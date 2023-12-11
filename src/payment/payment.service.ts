import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { type PaymentStatus } from '@prisma/client';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type UpdatePaymentDto } from './dto/index';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(order_id: string) {
    const isOrderExist = await this.findOrderById(order_id);
    const isPaymentExist = await this.findPaymentByOrderId(order_id);

    if (!isOrderExist) {
      throw new NotFoundException('Order not found');
    }

    if (isPaymentExist) {
      throw new ConflictException('Payment already exists');
    }

    const price = await this.getPriceFromOrder(order_id);

    const payment = await this.prisma.payment.create({
      data: {
        order_id,
        price,
        status: 'AWAITING',
      },
    });

    return payment;
  }

  async findAllPaymentMethods() {
    const methods = await this.prisma.paymentMethods.findMany();

    return methods;
  }

  async findPayment(payment_id: string) {
    const isPayment = await this.findPaymentById(payment_id);

    if (!isPayment) {
      throw new NotFoundException('Payment not found');
    }

    return isPayment;
  }

  async updatePaymentMethod(
    payment_id: string,
    payment_method_id: number,
    order_id: string,
  ) {
    const isPaymentExist = await this.findPaymentById(payment_id);

    if (!isPaymentExist) {
      throw new NotFoundException('Order not found');
    }

    const payment = await this.prisma.payment.update({
      where: {
        id: payment_id,
      },
      data: {
        payment_method: payment_method_id,
        status: 'SUCCESS',
      },
    });

    await this.prisma.orders.update({
      where: {
        id: order_id,
      },
      data: {
        state: 'MEASURING',
      },
    });

    return payment;
  }

  async updatePaymentStatus(
    payment_id: string,
    updatePaymentDto: UpdatePaymentDto,
  ) {
    const isPaymentExist = await this.findPaymentById(payment_id);

    if (!isPaymentExist) {
      throw new NotFoundException('Payment not found');
    }

    const payment = await this.prisma.payment.update({
      where: {
        id: payment_id,
      },
      data: {
        status: updatePaymentDto.status as PaymentStatus,
      },
    });

    return payment;
  }

  async findOrderById(id: string) {
    const order = await this.prisma.orders.findUnique({
      where: {
        id,
      },
    });

    if (order) {
      return true;
    }

    return false;
  }

  async getPriceFromOrder(order_id: string) {
    const order = await this.prisma.orderItems.findMany({
      where: {
        order_id: order_id,
      },
      include: {
        Clothes: {
          select: {
            price: true,
          },
        },
      },
    });

    let total = 0;

    for (const item of order) {
      total += item.Clothes.price;
    }

    return total;
  }

  async findPaymentById(payment_id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id: payment_id,
      },
    });

    if (payment) {
      return true;
    }

    return false;
  }

  async findPaymentByOrderId(orderId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: {
        order_id: orderId,
      },
    });

    if (payment) {
      return true;
    }

    return false;
  }
}
