import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
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

  @Transform(({ value }) => Number.parseInt(value))
  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  @ApiProperty({
    description: 'Quantity of the order.',
    example: '10',
  })
  quantity: number;
}
