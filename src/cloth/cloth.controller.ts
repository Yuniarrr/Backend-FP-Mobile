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
  UpdateClothTailorDto,
  UpdateClothUserDto,
} from './dto/index';

@ApiTags('Cloth')
@Controller('cloth')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class ClothController {
  constructor(private readonly clothService: ClothService) {}

  @Roles('USER')
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

  @Roles('USER')
  @ApiOkResponse({
    description: 'Update cloth by user.',
  })
  @Patch(':cloth_id/update')
  async updateClothUser(
    @Body(new ValidationPipe()) updateClothDto: UpdateClothUserDto,
    @Param('cloth_id') cloth_id: string,
  ) {
    try {
      const cloth = await this.clothService.updateClothUser(
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

  @Roles('TAILOR')
  @ApiOkResponse({
    description: 'Update cloth by tailor.',
  })
  @Patch(':cloth_id/status')
  async updateStatus(
    @Body(new ValidationPipe()) updateClothTailorDto: UpdateClothTailorDto,
    @Param('cloth_id') cloth_id: string,
  ) {
    try {
      const cloth = await this.clothService.updateClothTailor(
        cloth_id,
        updateClothTailorDto,
      );

      return {
        status: 'success',
        data: cloth,
      };
    } catch (error) {
      console.error('error in [POST] /cloth/:cloth_id/status', error);

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

  @ApiOkResponse({
    description: 'Get cloth by id.',
  })
  @Get(':cloth_id')
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
