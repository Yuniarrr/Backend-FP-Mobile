import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDefined,
  IsArray,
} from 'class-validator';

export class CreateTailorDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'Name for tailor', example: 'Penjahit' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Description of the tailor.',
    example: 'Penjahit yang sudah berpengalaman.',
  })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Address of the tailor.',
    example: 'Jl. Raya Bogor, No. 1, Jakarta Timur',
  })
  address: string;

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
  latitude?: string;

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
