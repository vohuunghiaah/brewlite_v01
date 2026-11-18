
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { OrdersService } from '../orders/orders.service.js';
import { OrderStatus } from '../orders/orders.types.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentStatus } from './payments.types.js';
import type { Payment } from './payments.types.js';

@Injectable()
export class PaymentsService {
  private readonly payments: Payment[] = [];

  constructor(private readonly ordersService: OrdersService) {}

  processPayment(dto: CreatePaymentDto): Payment {
    // 1. Tìm đơn hàng cần thanh toán
    const order = this.ordersService.findById(dto.orderId);

    if (!order) {
      throw new NotFoundException(
        `Không tìm thấy đơn hàng '${dto.orderId}'.`,
      );
    }

    // 2. Chỉ cho phép thanh toán đơn đang chờ
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(
        'Đơn hàng không ở trạng thái chờ thanh toán.',
      );
    }

    // 3. Mock Payment Gateway: mô phỏng kết quả thanh toán
    const isSuccessful = Math.random() < 0.8;

    const paymentStatus = isSuccessful
      ? PaymentStatus.SUCCESS
      : PaymentStatus.FAILED;

    // 4. Tạo thông tin giao dịch
    const payment: Payment = Object.freeze({
      id: randomUUID(),
      orderId: order.id,
      amount: order.total,
      method: dto.method,
      status: paymentStatus,
      transactionId: `TXN-${randomUUID()}`,
      createdAt: new Date().toISOString(),
    });

    // 5. Cập nhật trạng thái đơn hàng
    this.ordersService.updatePaymentStatus(
      order.id,
      isSuccessful
        ? OrderStatus.PAID
        : OrderStatus.PAYMENT_FAILED,
    );

    // 6. Lưu giao dịch
    this.payments.push(payment);

    return payment;
  }

  findAll(): readonly Payment[] {
    return Object.freeze([...this.payments]);
  }
}
