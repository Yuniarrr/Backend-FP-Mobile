import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ClothType, ClotheStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @IsEnum(ClotheStatus)
  @ApiProperty({
    description: 'Status for clothe.',
    enum: ClotheStatus,
  })
  status: string;
}
