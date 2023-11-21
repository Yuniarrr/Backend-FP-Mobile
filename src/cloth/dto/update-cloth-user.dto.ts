import { ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClothUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Description of the order.',
    example: 'Pesanan untuk acara pernikahan.',
  })
  description?: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Quantity of the order.',
    example: '10',
  })
  quantity?: number;
}
