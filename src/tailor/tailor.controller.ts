import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { GET_USER } from '../user/decorator/get-user.decorator';
import { CreateTailorDto } from './dto/create-tailor.dto';
import { UpdateTailorDto } from './dto/update-tailor.dto';
import { TailorService } from './tailor.service';

@ApiTags('Tailor')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('tailor')
export class TailorController {
  constructor(private readonly tailorService: TailorService) {}

  @ApiOkResponse({
    description: 'Create new tailor.',
  })
  @Post()
  async create(
    @Body() createTailorDto: CreateTailorDto,
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

  @ApiOkResponse({
    description: 'Get tailor by id.',
  })
  @Get('me')
  findOne(@GET_USER('id') user_id: string) {
    return this.tailorService.findOne(user_id);
  }

  @ApiOkResponse({
    description: 'Update tailor by id.',
  })
  @Patch(':id')
  async update(
    @GET_USER('id') user_id: string,
    @Body() updateTailorDto: UpdateTailorDto,
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
