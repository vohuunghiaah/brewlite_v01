import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './orders.service.js';
import type { Order } from './orders.types.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto): Order {
    return this.ordersService.create(createOrderDto);
  }
}
