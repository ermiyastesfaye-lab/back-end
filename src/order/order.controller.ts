import {
    Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { OrderService } from './order.service';
import { GetUser } from 'src/auth/decorator';
import { CreateOrderDto } from './dto';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getOrders(@GetUser('id') userId: number) {
    return this.orderService.getOrders(userId)
  }

  @Get(':id')
  getOrderById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.getOrderById(userId, orderId)
  }

  @Post()
  createOrder(@GetUser('id') userId: number, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(userId, dto)
  }

  @Delete(':id')
  deleteOrderById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.deleteOrderById(userId, orderId)
  }
}
