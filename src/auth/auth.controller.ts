import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateAuthDto, UpdateAuthDto } from './dto/index';
import { JwtGuard } from './guards/jwt.guard';

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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Get all user',
  })
  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Get user by id.',
  })
  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Update user by id.',
  })
  @Patch('user/:id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAuthDto: UpdateAuthDto,
  ) {
    return this.authService.update(id, updateAuthDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Delete user by id.',
  })
  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
