import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsOptional, IsArray } from 'class-validator';

import { CreateTailorDto } from './create-tailor.dto';

export class UpdateTailorDto extends PartialType(CreateTailorDto) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Name for tailor', example: 'Penjahit' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Description of the tailor.',
    example: 'Penjahit yang sudah berpengalaman.',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Address of the tailor.',
    example: 'Jl. Raya Bogor, No. 1, Jakarta Timur',
  })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Longitude of the tailor.',
    example: '-6.200000',
  })
  longitude?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Latitude of the tailor.',
    example: '-6.200000',
  })
  Latitude?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Opening time of the tailor.',
    example: '08:00:00',
  })
  opening_time?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Closing time of the tailor.',
    example: '17:00:00',
  })
  closing_time?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional({
    type: [String],
    description: 'Open days of the tailor.',
    isArray: true,
    example: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
  })
  open_days?: string[];
}
