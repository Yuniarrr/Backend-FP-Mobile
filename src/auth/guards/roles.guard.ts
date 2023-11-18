import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { type Role } from '@prisma/client';

import { PrismaService } from '../../infra/database/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token not found');
    }

    const [, token] = authHeader.split(' ');

    const decoded = this.jwt.decode(token);

    const user = await this.prisma.users.findUnique({
      where: {
        id: decoded.sub,
        email: decoded.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (roles.includes(user.role)) {
      return true;
    }

    throw new ForbiddenException('You do not have permission to access');
  }
}
