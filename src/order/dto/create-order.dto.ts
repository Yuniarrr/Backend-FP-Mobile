import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsDefined, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'For delivery address.', example: 'Surabaya' })
  delivery_address: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'For due date.', example: '2023-01-01T00:00:00' })
  due_date: string;
}
