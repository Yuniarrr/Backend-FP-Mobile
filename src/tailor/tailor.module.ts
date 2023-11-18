import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { TailorController } from './tailor.controller';
import { TailorService } from './tailor.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [TailorController],
  providers: [TailorService, PrismaService],
})
export class TailorModule {}
