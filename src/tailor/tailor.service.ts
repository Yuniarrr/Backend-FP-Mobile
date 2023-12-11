import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { type Prisma } from '@prisma/client';

import { PrismaService } from '../infra/database/prisma/prisma.service';
// import {
//   type IPaginatedResult,
//   type PaginateFunctionProps,
//   paginator,
// } from '../utils/paginator';
import {
  type CreateTailorDto,
  type UpdateTailorDto,
  type CreateTailorImageDto,
} from './dto/index';

// const paginate: PaginateFunctionProps = paginator({ perPage: 10 });

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Location {
  id: string;
  name: string;
  description: string;
  rating: number;
  address: string;
  longitude: string;
  latitude: string;
  opening_time: string;
  closing_time: string;
  open_days: string[];
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  distance: number;
  TailorImage: {
    id: string;
    image_url: string;
    tailor_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }[];
}

@Injectable()
export class TailorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTailorDto: CreateTailorDto, user_id: string) {
    const isUserExist = await this.findUserById(user_id);
    const isTailorExist = await this.findTailorByUserId(user_id);

    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }

    if (isTailorExist) {
      throw new ConflictException('Tailor already exists');
    }

    const tailor = await this.prisma.tailors.create({
      data: {
        ...createTailorDto,
        user_id,
      },
    });

    return tailor;
  }

  async findAll({
    orderBy,
  }: {
    orderBy?: Prisma.TailorsOrderByWithRelationInput;
  }) {
    return await this.prisma.tailors.findMany({
      include: {
        TailorImage: true,
      },
      orderBy,
    });

    // return paginate(
    //   tailors,
    //   {
    //     orderBy,
    //   },
    //   {
    //     page,
    //   },
    // );
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
      include: {
        TailorImage: true,
      },
    });

    return tailor;
  }

  async getNearest(currentLat: number, currentLon: number) {
    const locationsFromDatabase = await this.prisma.tailors.findMany({
      where: {
        AND: [
          {
            longitude: {
              not: null,
            },
          },
          {
            latitude: {
              not: null,
            },
          },
        ],
      },
      take: 10,
      include: {
        TailorImage: true,
      },
    });

    const nearestLocation: Location[] = [];

    for (let index = 0; index < 10; index++) {
      const distance = this.calculateDistance(
        currentLat,
        currentLon,
        Number.parseFloat(locationsFromDatabase[index].latitude),
        Number.parseFloat(locationsFromDatabase[index].longitude),
      );

      nearestLocation.push({
        ...locationsFromDatabase[index],
        distance,
      });
    }

    return nearestLocation.sort((a, b) => a.distance - b.distance);
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    // const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // const distance = R * c;

    return c;
  }

  async getFavorite(user_id: string) {
    const favorite = await this.prisma.orders.findMany({
      where: {
        user_id,
      },
      distinct: ['tailor_id'], // Retrieve distinct tailor_id values
      select: {
        tailor_id: true,
        Tailors: {
          include: {
            TailorImage: true,
          },
        },
      },
    });

    return favorite;
  }

  async createTailorImage(data: CreateTailorImageDto, tailor_id: string) {
    const images = [];

    for (const img in data) {
      const image = await this.prisma.tailorImage.create({
        data: {
          tailor_id,
          image_url: img,
        },
      });

      images.push(image);
    }

    return images;
  }
}
