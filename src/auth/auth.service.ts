import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type CreateAuthDto } from './dto/create-auth.dto';
import { type UpdateAuthDto } from './dto/update-auth.dto';

const salt = bcrypt.genSaltSync(12);

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const user = await this.prisma.users.create({
      data: {
        ...createAuthDto,
        password: bcrypt.hashSync(createAuthDto.password, salt),
      },
    });

    return user;
  }

  findAll() {
    const users = this.prisma.users.findMany();

    return users;
  }

  findOne(id: string) {
    const user = this.prisma.users.findUnique({
      where: { id: id },
    });

    return user;
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = this.prisma.users.update({
      where: { id: id },
      data: {
        ...updateAuthDto,
        password: bcrypt.hashSync(updateAuthDto.password, salt),
      },
    });

    return user;
  }

  remove(id: string) {
    const user = this.prisma.users.delete({
      where: { id: id },
    });

    return user;
  }
}
