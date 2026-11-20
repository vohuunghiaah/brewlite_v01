
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { OrdersService } from '../orders/orders.service.js';
import { OrderStatus } from '../orders/orders.types.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentMethod, PaymentStatus } from './payments.types.js';
import type { Payment } from './payments.types.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private readonly payments: Payment[] = [];

  constructor(
    private readonly ordersService: OrdersService,
    private readonly prisma: PrismaService,
  ) {}

  async processPayment(dto: CreatePaymentDto): Promise<Payment> {
    const idempotencyKey =
      dto.idempotencyKey ?? `payment:${dto.orderId}:${dto.method}`;

    const existing = await this.prisma.payment.findUnique({
      where: { idempotencyKey },
    }).catch(() => null);

    if (existing) {
      return Object.freeze({
        id: existing.id,
        orderId: existing.orderId,
        amount: existing.amount,
        method: existing.method as PaymentMethod,
        status: existing.status as PaymentStatus,
        transactionId: existing.transactionId,
        createdAt: existing.createdAt.toISOString(),
      });
    }

    // 1. Tìm đơn hàng cần thanh toán
    const order = await this.ordersService.findById(dto.orderId);

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

    // 5. Cập nhật trạng thái và lưu giao dịch trong một transaction
    await this.prisma.$transaction(async (tx) => {
      await tx.payment.create({
        data: {
          id: payment.id,
          orderId: payment.orderId,
          idempotencyKey,
          amount: payment.amount,
          method: payment.method,
          status: payment.status,
          transactionId: payment.transactionId,
          createdAt: new Date(payment.createdAt),
        },
      });

      await tx.order.update({
        where: { id: order.id },
        data: {
          status: isSuccessful
            ? OrderStatus.PAID
            : OrderStatus.PAYMENT_FAILED,
        },
      });

      if (isSuccessful && order.userId) {
        const points = Math.floor(order.total / 10000);
        await tx.order.update({
          where: { id: order.id },
          data: { loyaltyPointsAwarded: points },
        });
        await tx.user.update({
          where: { id: order.userId },
          data: { loyaltyPoints: { increment: points } },
        });
      }
    }).catch((error) => {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Giao dịch thanh toán đã được xử lý hoặc idempotency key bị trùng.',
        );
      }
      throw error;
    });

    // 6. Giữ lại bộ nhớ trong tiến trình để tương thích API findAll
    this.payments.push(payment);

    return payment;
  }

  findAll(): readonly Payment[] {
    return Object.freeze([...this.payments]);
  }
}
