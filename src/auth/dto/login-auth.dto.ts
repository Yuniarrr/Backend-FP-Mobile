import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsEmail, IsDefined, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user.',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of the user.',
    example: 'password',
  })
  password: string;
}
