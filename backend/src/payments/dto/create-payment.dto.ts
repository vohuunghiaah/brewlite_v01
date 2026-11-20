
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../payments.types.js';

export class CreatePaymentDto {
  @IsString({ message: 'orderId phải là chuỗi' })
  @IsNotEmpty({ message: 'orderId không được để trống' })
  orderId!: string;

  @IsEnum(PaymentMethod, {
    message: 'method phải là WALLET hoặc CARD',
  })
  method!: PaymentMethod;

  @IsOptional()
  @IsString({ message: 'idempotencyKey phải là chuỗi' })
  @IsNotEmpty({ message: 'idempotencyKey không được để trống' })
  idempotencyKey?: string;
}
