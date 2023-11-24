import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/Roles.decorator';
import { RolesGuard, JwtGuard } from '../auth/guards';
import { GET_USER } from '../user/decorator/get-user.decorator';
import { CreateTailorDto } from './dto/create-tailor.dto';
import { UpdateTailorDto } from './dto/update-tailor.dto';
import { TailorService } from './tailor.service';

@ApiTags('Tailor')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('tailor')
export class TailorController {
  constructor(private readonly tailorService: TailorService) {}

  @Roles('TAILOR')
  @ApiOkResponse({
    description: 'Create new tailor.',
  })
  @Post('create')
  async create(
    @Body(new ValidationPipe()) createTailorDto: CreateTailorDto,
    @GET_USER('id') user_id: string,
  ) {
    try {
      const tailor = await this.tailorService.create(createTailorDto, user_id);

      return {
        status: 'success',
        data: tailor,
      };
    } catch (error) {
      console.error('Error in createTailor:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get all tailors.',
  })
  @Get('all')
  async findAllTailors() {
    try {
      const tailors = await this.tailorService.findAll();

      return {
        status: 'success',
        data: tailors,
      };
    } catch (error) {
      console.error('Error in findAllTailors:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get tailor by id.',
  })
  @Get('me')
  async findOne(@GET_USER('id') user_id: string) {
    try {
      const tailor = await this.tailorService.findOne(user_id);

      return {
        status: 'success',
        data: tailor,
      };
    } catch (error) {
      console.error('Error in findOneTailor:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }

  @Roles('TAILOR')
  @ApiOkResponse({
    description: 'Update tailor by id.',
  })
  @Patch('update')
  async update(
    @GET_USER('id') user_id: string,
    @Body(new ValidationPipe()) updateTailorDto: UpdateTailorDto,
  ) {
    try {
      const tailor = await this.tailorService.update(updateTailorDto, user_id);

      return {
        status: 'success',
        data: tailor,
      };
    } catch (error) {
      console.error('Error in updateTailor:', error);

      return {
        status: 'failed',
        message: 'Internal server error',
      };
    }
  }
}
