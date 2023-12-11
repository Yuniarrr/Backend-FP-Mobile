import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from './infra/database/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TailorModule } from './tailor/tailor.module';
import { OrderModule } from './order/order.module';
import { ClothModule } from './cloth/cloth.module';
import { PaymentModule } from './payment/payment.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5 * 60,
      max: 100,
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    AuthModule,
    UserModule,
    TailorModule,
    OrderModule,
    ClothModule,
    PaymentModule,
    ChatModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
