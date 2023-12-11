import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
  NotFoundException,
  HttpException,
  HttpStatus,
  Body,
  ValidationPipe,
  ConflictException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/Roles.decorator';
import { JwtGuard, RolesGuard } from '../auth/guards';
import { UpdatePaymentDto } from './dto';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles('USER', 'TAILOR')
  @ApiOkResponse({
    description: 'Get all payment.',
  })
  @Get('methods')
  async findAllPaymentMethods() {
    try {
      const methods = await this.paymentService.findAllPaymentMethods();

      return {
        status: 'success',
        data: methods,
      };
    } catch (error) {
      console.error('error in findAllPaymentMethods', error);

      return {
        status: 'failed',
        message: error,
      };
    }
  }

  @Roles('USER')
  @ApiOkResponse({
    description: 'Create new payment.',
  })
  @Post(':order_id')
  async createPayment(@Param('order_id') order_id: string) {
    try {
      const paymment = await this.paymentService.createPayment(order_id);

      return {
        status: 'success',
        data: paymment,
      };
    } catch (error) {
      console.error('error in createPayment', error);

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

  @Roles('USER')
  @ApiOkResponse({
    description: 'Update method payment by id.',
  })
  @Patch(':payment_id/method/:payment_method_id/order/:order_id')
  async updatePaymentMethod(
    @Param('order_id') order_id: string,
    @Param('payment_id') payment_id: string,
    @Param('payment_method_id') payment_method_id: number,
  ) {
    try {
      const payment = await this.paymentService.updatePaymentMethod(
        payment_id,
        payment_method_id,
        order_id,
      );

      return {
        status: 'success',
        data: payment,
      };
    } catch (error) {
      console.error('error in updatePaymentMethod', error);

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

  @Roles('USER', 'TAILOR')
  @ApiOkResponse({
    description: 'Get payment by id.',
  })
  @Get(':payment_id')
  async findPayment(@Param('payment_id') payment_id: string) {
    try {
      const isPayment = await this.paymentService.findPayment(payment_id);

      return {
        status: 'success',
        data: isPayment,
      };
    } catch (error) {
      console.error('error in findPayment', error);

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
    description: 'Update method payment by id.',
  })
  @Patch(':payment_id/status')
  async updatePaymentStatus(
    @Param('payment_id') payment_id: string,
    @Body(new ValidationPipe()) updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      const payment = await this.paymentService.updatePaymentStatus(
        payment_id,
        updatePaymentDto,
      );

      return {
        status: 'success',
        data: payment,
      };
    } catch (error) {
      console.error('error in updatePaymentMethod', error);

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
