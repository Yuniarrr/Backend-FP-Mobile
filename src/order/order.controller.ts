import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ValidationPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/Roles.decorator';
import { JwtGuard, RolesGuard } from '../auth/guards/index';
import { GET_USER } from '../user/decorator/get-user.decorator';
import {
  UpdateOrderDto,
  CreateOrderDto,
  UpdateOrderStatusDto,
} from './dto/index';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse({
    description: 'Create new order.',
  })
  @Roles('TAILOR')
  @Post('create')
  async createOrder(
    @Body(new ValidationPipe()) createOrderDto: CreateOrderDto,
    @GET_USER('id') tailor_user_id: string,
  ) {
    try {
      const order = await this.orderService.createOrder(
        createOrderDto,
        tailor_user_id,
      );

      return {
        status: 'success',
        data: order,
      };
    } catch (error) {
      console.error(error);

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
        status: 'error',
        message: error,
      };
    }
  }

  @ApiOkResponse({
    description: 'Update order by id from user.',
  })
  @Roles('TAILOR')
  @Patch(':order_id/update')
  async updateOrderUser(
    @Param('order_id') id: string,
    @Body(new ValidationPipe()) updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await this.orderService.updateOrder(id, updateOrderDto);

      return {
        status: 'success',
        data: order,
      };
    } catch (error) {
      console.error('Error updating order from user', error);

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
        status: 'error',
        message: error,
      };
    }
  }

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get all orders.',
  })
  @Get('all')
  async findAll(@GET_USER('id') user_id: string) {
    try {
      const orders = await this.orderService.findAll(user_id);

      return {
        status: 'success',
        data: orders,
      };
    } catch (error) {
      console.error('Error getting all orders', error);

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
        status: 'error',
        message: error,
      };
    }
  }

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get order by id.',
  })
  @Get(':order_id/clothes')
  async findClothByOrderId(@Param('order_id') order_id: string) {
    try {
      const clothes = await this.orderService.findClothByOrderId(order_id);

      return {
        status: 'success',
        data: clothes,
      };
    } catch (error) {
      console.error('Error getting order by id', error);

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
        status: 'error',
        message: error,
      };
    }
  }

  @Roles('TAILOR', 'USER')
  @ApiOkResponse({
    description: 'Get order detail by id.',
  })
  @Get(':order_id/detail')
  async findOrderDetailById(@Param('order_id') order_id: string) {
    try {
      const order = await this.orderService.findOrderDetailById(order_id);

      return {
        status: 'success',
        data: order,
      };
    } catch (error) {
      console.error('Error getting order detail by id', error);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const error_ =
        error instanceof NotFoundException
          ? new HttpException(
              {
                status: 'failed',
                message: error.message,
              },
              HttpStatus.NOT_FOUND,
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
    description: 'Update stutus of order',
  })
  @Patch(':order_id/status')
  async updateStatusOrder(
    @Param('order_id') order_id: string,
    @Body(new ValidationPipe()) data: UpdateOrderStatusDto,
  ) {
    try {
      const order = await this.orderService.updateStatusOrder(order_id, data);

      return {
        status: 'success',
        data: order,
      };
    } catch (error) {
      console.error('Error getting order detail by id', error);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const error_ =
        error instanceof NotFoundException
          ? new HttpException(
              {
                status: 'failed',
                message: error.message,
              },
              HttpStatus.NOT_FOUND,
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
