import { Injectable } from '@nestjs/common';

import { type ClotheStatus } from '@prisma/client';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import {
  type UpdateClothUserDto,
  type UpdateClothTailorDto,
  type CreateClothDto,
} from './dto/index';

@Injectable()
export class ClothService {
  constructor(private readonly prisma: PrismaService) {}

  async createCloth(createClothDto: CreateClothDto, order_id: string) {
    const cloth = await this.prisma.clothes.create({
      data: {
        ...createClothDto,
        status: 'AWAITING',
      },
    });

    await this.prisma.orderItems.create({
      data: {
        order_id: order_id,
        cloth_id: cloth.id,
      },
    });

    return cloth;
  }

  async updateClothTailor(
    id: string,
    updateClothTailorDto: UpdateClothTailorDto,
  ) {
    const cloth = await this.prisma.clothes.update({
      where: { id: id },
      data: {
        ...updateClothTailorDto,
        status: updateClothTailorDto.status as ClotheStatus,
      },
    });

    return cloth;
  }

  async updateClothUser(id: string, updateClothUser: UpdateClothUserDto) {
    const cloth = await this.prisma.clothes.update({
      where: { id: id },
      data: {
        ...updateClothUser,
      },
    });

    return cloth;
  }

  findAll() {
    return `This action returns all cloth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cloth`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloth`;
  }
}
