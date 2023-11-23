import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsDefined, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'For delivery address.', example: 'Surabaya' })
  delivery_address: string;

  @IsDateString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'For due date.', example: '2023-01-01T00:00:00' })
  due_date: string;
}
