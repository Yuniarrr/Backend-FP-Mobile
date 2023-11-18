import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Create new user.',
  })
  @Post()
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
    description: 'Get all user',
  })
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @ApiOkResponse({
    description: 'Get user by id.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Update user by id.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAuthDto: UpdateAuthDto,
  ) {
    return this.authService.update(id, updateAuthDto);
  }

  @ApiOkResponse({
    description: 'Delete user by id.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
