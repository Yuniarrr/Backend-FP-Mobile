import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  username?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Password of the user.',
    example: 'AbCd12345678',
  })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  full_name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Phone number of the user.',
    example: '+6281234567890',
  })
  phone_number?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Address of the user.',
    example: 'Jl. Raya Bogor, No. 123',
  })
  address?: string;
}
