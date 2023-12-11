import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [ChatGateway, ChatService, PrismaService],
})
export class ChatModule {}
