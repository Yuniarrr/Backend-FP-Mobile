import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type LoginAuthDto, type CreateAuthDto } from './dto/index';

const salt = bcrypt.genSaltSync(12);

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
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

  async login(data: LoginAuthDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Password not match');
    }

    const token = await this.generateToken(user.id, user.email, user.role);

    return token;
  }

  async generateToken(
    id: string,
    email: string,
    role: string,
  ): Promise<{ token: string }> {
    const payload = {
      id,
      email,
      role,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
    });

    return {
      token,
    };
  }
}
