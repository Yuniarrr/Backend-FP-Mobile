import { ApiProperty } from '@nestjs/swagger';

import { StateOrder } from '@prisma/client';
import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @IsEnum(StateOrder)
  @ApiProperty({
    description: 'Status for clothe.',
    enum: StateOrder,
  })
  state: string;
}
