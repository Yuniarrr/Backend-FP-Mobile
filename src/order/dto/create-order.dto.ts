import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsDefined, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'Full name of the user.', example: 'John Doe' })
  delivery_address: string;

  @IsDateString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'Full name of the user.', example: 'John Doe' })
  due_date: string;
}
