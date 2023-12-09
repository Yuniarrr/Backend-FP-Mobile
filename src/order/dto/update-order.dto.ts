import { ApiPropertyOptional } from '@nestjs/swagger';

import { StateOrder } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  delivery_address?: string;

  @Transform(({ value }) => new Date(value))
  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  due_date?: string;

  @Transform(({ value }) => value as StateOrder)
  @IsOptional()
  @IsString()
  @IsEnum(StateOrder)
  @ApiPropertyOptional({
    description: 'Status for clothe.',
    enum: StateOrder,
  })
  state?: string;
}
