import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsArray } from 'class-validator';

export class CreateTailorImageDto {
  // eslint-disable-next-line @darraghor/nestjs-typed/api-property-returning-array-should-set-array
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Name for tailor',
    example: ['Penjahit'],
  })
  image?: string[];
}
