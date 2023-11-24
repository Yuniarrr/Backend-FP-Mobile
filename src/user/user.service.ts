import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type UpdateUserDto } from './dto/update-user.dto';

const salt = bcrypt.genSaltSync(12);

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.users.findMany();

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: id },
    });

    return user;
  }

  async update(id: string, updateAuthDto: UpdateUserDto) {
    const { password, ...otherUpdateData } = updateAuthDto;

    const userData = password
      ? {
          ...otherUpdateData,
          password: bcrypt.hashSync(password, salt),
        }
      : { ...otherUpdateData };

    const user = await this.prisma.users.update({
      where: { id: id },
      data: userData,
    });

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.users.delete({
      where: { id: id },
    });

    return user;
  }
}
