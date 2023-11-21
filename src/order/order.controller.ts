import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { GET_USER } from '../user/decorator/get-user.decorator';
import { type UpdateOrderDto, type CreateOrderDto } from './dto/index';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Create new order.',
  })
  @Post(':tailor_id')
  createOrder(
    @Body(new ValidationPipe()) createOrderDto: CreateOrderDto,
    @GET_USER('id') user_id: string,
    @Param('tailor_id') tailor_id: string,
  ) {
    try {
      const order = this.orderService.createOrder(
        createOrderDto,
        tailor_id,
        user_id,
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
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderUser(id, updateOrderDto);
  }

  @ApiOkResponse({
    description: 'Get all orders.',
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOkResponse({
    description: 'Get order by id.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Delete order by id.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
