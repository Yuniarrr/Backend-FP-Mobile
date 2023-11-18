import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
