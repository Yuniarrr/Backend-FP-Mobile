import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type UpdateUserDto } from './dto/update-user.dto';

const salt = bcrypt.genSaltSync(12);

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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

  update(id: string, updateAuthDto: UpdateUserDto) {
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
