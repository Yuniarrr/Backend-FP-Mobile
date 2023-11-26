import { Injectable, NotFoundException } from '@nestjs/common';

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
    cloth_id: string,
    updateClothTailorDto: UpdateClothTailorDto,
  ) {
    const isClothExists = await this.findClothById(cloth_id);

    if (!isClothExists) {
      throw new NotFoundException('Cloth not found');
    }

    const cloth = await this.prisma.clothes.update({
      where: { id: cloth_id },
      data: {
        ...updateClothTailorDto,
        status: updateClothTailorDto.status as ClotheStatus,
      },
    });

    return cloth;
  }

  async updateCloth(cloth_id: string, updateClothUser: UpdateClothUserDto) {
    const isClothExists = await this.findClothById(cloth_id);

    if (!isClothExists) {
      throw new NotFoundException('Cloth not found');
    }

    const cloth = await this.prisma.clothes.update({
      where: { id: cloth_id },
      data: {
        ...updateClothUser,
        status: updateClothUser.status as ClotheStatus,
      },
    });

    return cloth;
  }

  async findCloth(cloth_id: string) {
    const isClothExists = await this.findClothById(cloth_id);

    if (!isClothExists) {
      throw new NotFoundException('Cloth not found');
    }

    const cloth = await this.prisma.clothes.findUnique({
      where: { id: cloth_id },
    });

    return cloth;
  }

  async findClothById(cloth_id: string) {
    const cloth = await this.prisma.clothes.findUnique({
      where: { id: cloth_id },
    });

    if (cloth) {
      return true;
    }

    return false;
  }
}
