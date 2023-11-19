import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
