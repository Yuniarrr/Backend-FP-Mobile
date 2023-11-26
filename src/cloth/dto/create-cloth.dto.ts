import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ClothType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsOptional,
  IsNumber,
  IsEnum,
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

  @Transform(({ value }) => Number.parseInt(value))
  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  @ApiProperty({
    description: 'Price for clothe.',
    example: 100_000,
  })
  price: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  bust?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  waist?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  hips?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  sleeve_length?: number;

  @IsOptional()
  @IsString()
  @IsEnum(ClothType)
  @ApiPropertyOptional({
    description: 'Status for clothe.',
    enum: ClothType,
  })
  cloth_type?: string;
}
