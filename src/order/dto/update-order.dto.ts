import { ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

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
}
