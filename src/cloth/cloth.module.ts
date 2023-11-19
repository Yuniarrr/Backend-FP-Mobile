import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { ClothController } from './cloth.controller';
import { ClothService } from './cloth.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ClothController],
  providers: [ClothService, PrismaService],
})
export class ClothModule {}
