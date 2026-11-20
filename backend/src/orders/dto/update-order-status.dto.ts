import { IsEnum } from 'class-validator';
import { OrderStatus } from '../orders.types.js';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, {
    message: 'status không hợp lệ.',
  })
  status!: OrderStatus;
}
