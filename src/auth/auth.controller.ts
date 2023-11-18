import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/index';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Create new user.',
  })
  @Post('create')
  async create(@Body(ValidationPipe) createAuthDto: CreateAuthDto) {
    try {
      const user = await this.authService.create(createAuthDto);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in createUser:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Create new user.',
  })
  @Post('login')
  async login(@Body(ValidationPipe) data: LoginAuthDto) {
    try {
      const user = await this.authService.login(data);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in createUser:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }
}
