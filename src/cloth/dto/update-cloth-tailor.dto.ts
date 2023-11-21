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

export class UpdateClothTailorDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Price for clothe.',
    example: 100_000,
  })
  price?: number;

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
