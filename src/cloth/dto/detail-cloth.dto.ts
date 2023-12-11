import { ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class DetailClothDto {
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
}
