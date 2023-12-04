import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/Roles.decorator';
import { JwtGuard, RolesGuard } from '../auth/guards/index';
import { ClothService } from './cloth.service';
import {
  CreateClothDto,
  DetailClothDto,
  UpdateClothUserDto,
} from './dto/index';

@ApiTags('Cloth')
@Controller('cloth')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class ClothController {
  constructor(private readonly clothService: ClothService) {}

  @Roles('TAILOR')
  @ApiOkResponse({
    description: 'Create new cloth.',
  })
  @Post(':order_id/create')
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

  @Roles('TAILOR')
  @ApiOkResponse({
    description: 'Create new cloth.',
  })
  @Post(':cloth_id/create/detail')
  async createDetailCloth(
    @Body(new ValidationPipe()) detailClothDto: DetailClothDto,
    @Param('cloth_id') cloth_id: string,
  ) {
    try {
      const order = await this.clothService.createDetailCloth(
        detailClothDto,
        cloth_id,
      );

      return {
        status: 'success',
        data: order,
      };
    } catch (error) {
      console.error('error in [POST] /order/:cloth_id/create/detail', error);
    }
  }

  @Roles('TAILOR')
  @ApiOkResponse({
    description: 'Update cloth by user.',
  })
  @Patch(':cloth_id/update')
  async updateCloth(
    @Body(new ValidationPipe()) updateClothDto: UpdateClothUserDto,
    @Param('cloth_id') cloth_id: string,
  ) {
    try {
      const cloth = await this.clothService.updateCloth(
        cloth_id,
        updateClothDto,
      );

      return {
        status: 'success',
        data: cloth,
      };
    } catch (error) {
      console.error('error in [POST] /cloth/:cloth_id/update', error);

      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: 'failed',
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: 'failed',
        message: error,
      };
    }
  }

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get cloth by id.',
  })
  @Get(':cloth_id/find')
  async findCloth(@Param('cloth_id') cloth_id: string) {
    try {
      const cloth = await this.clothService.findCloth(cloth_id);

      return {
        status: 'success',
        data: cloth,
      };
    } catch (error) {
      console.error('error in [GET] /cloth/:cloth_id', error);

      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: 'failed',
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: 'failed',
        message: error,
      };
    }
  }
}
