import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { GET_USER } from './decorator/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'Get all user',
  })
  @Get('all')
  async findAll() {
    try {
      const user = await this.userService.findAll();

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in findAllUser:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Get user by id.',
  })
  @Get('me')
  async findOne(@GET_USER('id') user_id: string) {
    try {
      const user = await this.userService.findOne(user_id);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in findOneUser:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Update user by id.',
  })
  @Patch()
  update(
    @GET_USER('id') user_id: string,
    @Body(ValidationPipe) updateAuthDto: UpdateUserDto,
  ) {
    try {
      const user = this.userService.update(user_id, updateAuthDto);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in updateOneUser:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Delete user by id.',
  })
  @Delete()
  remove(@GET_USER('id') user_id: string) {
    try {
      const user = this.userService.remove(user_id);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in removeOneUser:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }
}
