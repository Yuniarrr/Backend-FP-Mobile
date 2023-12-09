import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { StateOrder } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'For delivery address.', example: 'Surabaya' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'For delivery address.', example: 'Surabaya' })
  delivery_address: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'For due date.', example: '2023-01-01' })
  due_date: string;

  @IsOptional()
  @IsString()
  @IsEnum(StateOrder)
  @ApiPropertyOptional({
    description: 'Status for clothe.',
    enum: StateOrder,
  })
  state?: string;
}
