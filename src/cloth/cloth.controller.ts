import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { ClothService } from './cloth.service';
import { CreateClothDto } from './dto/index';

@ApiTags('Cloth')
@Controller('cloth')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class ClothController {
  constructor(private readonly clothService: ClothService) {}

  @ApiOkResponse({
    description: 'Create new cloth.',
  })
  @Post(':order_id/items')
  async create(
    @Body(new ValidationPipe()) createClothDto: CreateClothDto,
    @Param('order_id') order_id: string,
  ) {
    try {
      const order = await this.clothService.createCloth(
        createClothDto,
        order_id,
      );

      return {
        status: 'success',
        data: order,
      };
    } catch (error) {
      console.error('error in [POST] /order/:order_id/items', error);
    }
  }

  @ApiOkResponse({
    description: 'Get all cloths.',
  })
  @Get()
  findAll() {
    return this.clothService.findAll();
  }

  @ApiOkResponse({
    description: 'Get cloth by id.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Delete cloth by id.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothService.remove(+id);
  }
}
