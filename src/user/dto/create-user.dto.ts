import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDefined,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'Full name of the user.', example: 'John Doe' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Email of the user.',
    example: 'jhondoe@mail.com ',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Password of the user.',
    example: 'AbCd12345678',
  })
  password: string;

  @IsDefined()
  @IsEnum(Role)
  @ApiProperty({ description: 'Role of the user.', enum: Role })
  role: Role;
}
