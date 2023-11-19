import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateClothDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'Full name of the user.', example: 'John Doe' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Description of the order.',
    example: 'Pesanan untuk acara pernikahan.',
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Quantity of the order.',
    example: '10',
  })
  quantity?: number;
}
