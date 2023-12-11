import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ClotheStatus } from '@prisma/client';
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
  bust_top?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  waist_top?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  hips_top?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  sleeve_length_top?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  length_top?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  inseam_bottom?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  waist_bottom?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  hips_bottom?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Sizes of the clothes.',
    example: '10',
  })
  length_bottom?: number;

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
