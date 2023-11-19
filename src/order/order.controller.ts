import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from 'auth/guards/jwt.guard';

import { type UpdateOrderDto, type CreateOrderDto } from './dto/index';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse({
    description: 'Create new order.',
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
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
    description: 'Update order by id.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOkResponse({
    description: 'Delete order by id.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
