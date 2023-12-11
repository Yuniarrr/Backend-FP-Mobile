import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  ValidationPipe,
  Query,
  NotFoundException,
  HttpException,
  HttpStatus,
  ConflictException,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';

import { Roles } from '../auth/decorators/Roles.decorator';
import { RolesGuard, JwtGuard } from '../auth/guards';
import { GET_USER } from '../user/decorator/get-user.decorator';
import { CreateTailorImageDto } from './dto/create-tailor-image.dto';
import { CreateTailorDto } from './dto/create-tailor.dto';
import { UpdateTailorDto } from './dto/update-tailor.dto';
import { TailorService } from './tailor.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Location {
  id: string;
  name: string;
  description: string;
  rating: number;
  address: string;
  longitude: string;
  latitude: string;
  opening_time: string;
  closing_time: string;
  open_days: string[];
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  distance: number;
  TailorImage: {
    id: string;
    image_url: string;
    tailor_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }[];
}

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

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const error_ =
        error instanceof NotFoundException || error instanceof ConflictException
          ? new HttpException(
              {
                status: 'failed',
                message: error.message,
              },
              error.getStatus(),
            )
          : new HttpException(
              {
                status: 'failed',
                message: error,
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );

      throw error_;
    }
  }

  @Roles('TAILOR')
  @ApiOkResponse({
    description: 'Create new tailor.',
  })
  @Post(':tailor_id/image')
  async createTailorImage(
    @Param('tailor_id') tailor_id: string,
    @Body(new ValidationPipe()) data: CreateTailorImageDto,
  ) {
    try {
      const tailor = await this.tailorService.createTailorImage(
        data,
        tailor_id,
      );

      return {
        status: 'success',
        data: tailor,
      };
    } catch (error) {
      console.error('Error in createTailor:', error);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const error_ =
        error instanceof NotFoundException || error instanceof ConflictException
          ? new HttpException(
              {
                status: 'failed',
                message: error.message,
              },
              error.getStatus(),
            )
          : new HttpException(
              {
                status: 'failed',
                message: error,
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );

      throw error_;
    }
  }

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get all tailors.',
  })
  @ApiConsumes('multipart/form-data')
  @Get('all')
  async findAllTailors(@Query('orderBy') orderBy: string | undefined) {
    try {
      const tailors = await this.tailorService.findAll({
        orderBy: orderBy ? { [orderBy]: 'desc' } : undefined,
      });

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

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get tailor by id.',
  })
  @Get('lat/:lat/lon/:lon')
  async getNearestPlace(
    @Param('lat') currentLat: number,
    @Param('lon') currentLon: number,
  ): Promise<{ status: string; data: Location[] }> {
    try {
      const nearestTailor = await this.tailorService.getNearest(
        currentLat,
        currentLon,
      );

      return {
        status: 'success',
        data: nearestTailor,
      };
    } catch (error) {
      console.error('Error in createTailor:', error);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const error_ =
        error instanceof NotFoundException || error instanceof ConflictException
          ? new HttpException(
              {
                status: 'failed',
                message: error.message,
              },
              error.getStatus(),
            )
          : new HttpException(
              {
                status: 'failed',
                message: error,
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );

      throw error_;
    }
  }

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get tailor by id.',
  })
  @Get('favorite')
  async getFavorite(@GET_USER('id') user_id: string) {
    try {
      const favorite = await this.tailorService.getFavorite(user_id);

      return {
        status: 'success',
        data: favorite,
      };
    } catch (error) {
      console.error('Error in createTailor:', error);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const error_ =
        error instanceof NotFoundException || error instanceof ConflictException
          ? new HttpException(
              {
                status: 'failed',
                message: error.message,
              },
              error.getStatus(),
            )
          : new HttpException(
              {
                status: 'failed',
                message: error,
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );

      throw error_;
    }
  }
}
