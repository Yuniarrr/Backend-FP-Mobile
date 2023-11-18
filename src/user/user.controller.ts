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
  findAll() {
    return this.userService.findAll();
  }

  @ApiOkResponse({
    description: 'Get user by id.',
  })
  @Get()
  findOne(@GET_USER('id') user_id: string) {
    return this.userService.findOne(user_id);
  }

  @ApiOkResponse({
    description: 'Update user by id.',
  })
  @Patch()
  update(
    @GET_USER('id') user_id: string,
    @Body(ValidationPipe) updateAuthDto: UpdateUserDto,
  ) {
    return this.userService.update(user_id, updateAuthDto);
  }

  @ApiOkResponse({
    description: 'Delete user by id.',
  })
  @Delete()
  remove(@GET_USER('id') user_id: string) {
    return this.userService.remove(user_id);
  }
}
