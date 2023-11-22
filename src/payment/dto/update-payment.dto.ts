import { ApiProperty } from '@nestjs/swagger';

import { PaymentStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsDefined, IsEnum } from 'class-validator';

export class UpdatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEnum(PaymentStatus)
  @ApiProperty({ description: 'Payment status is change', enum: PaymentStatus })
  status: string;
}
