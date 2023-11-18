import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type CreateTailorDto, type UpdateTailorDto } from './dto/index';

@Injectable()
export class TailorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTailorDto: CreateTailorDto, user_id: string) {
    const user = await this.findUserById(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tailor = await this.prisma.tailors.create({
      data: {
        ...createTailorDto,
        Users: {
          connect: {
            id: user_id,
          },
        },
      },
    });

    return tailor;
  }

  async findAll() {
    const tailors = await this.prisma.tailors.findMany();

    return tailors;
  }

  async findOne(id: string) {
    const tailor = await this.findTailorByUserId(id);

    if (!tailor) {
      throw new NotFoundException('Tailor not found');
    }

    return tailor;
  }

  async update(updateTailorDto: UpdateTailorDto, user_id: string) {
    const tailor = await this.findTailorByUserId(user_id);

    if (!tailor) {
      throw new NotFoundException('Tailor not found');
    }

    const updateTailor = await this.prisma.tailors.update({
      where: { user_id: user_id },
      data: {
        ...updateTailorDto,
      },
    });

    return updateTailor;
  }

  remove(id: number) {
    return `This action removes a #${id} tailor`;
  }

  async findUserById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: id },
    });

    return user;
  }

  async findTailorByUserId(user_id: string) {
    const tailor = await this.prisma.tailors.findUnique({
      where: { user_id: user_id },
    });

    return tailor;
  }
}
