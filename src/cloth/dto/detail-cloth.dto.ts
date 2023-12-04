import { ApiPropertyOptional } from '@nestjs/swagger';

import { ClothType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class DetailClothDto {
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

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  length?: number;

  @IsOptional()
  @IsString()
  @IsEnum(ClothType)
  @ApiPropertyOptional({
    description: 'Status for clothe.',
    enum: ClothType,
  })
  cloth_type?: string;
}
