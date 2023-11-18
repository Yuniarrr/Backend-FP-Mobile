import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsOptional } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Phone number of the user.',
    example: '+6281234567890',
  })
  password: string;
}
