import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { ProductsService } from '../products/products.service.js';
import { OrdersService } from './orders.service.js';
import { DrinkSize, OrderStatus } from './orders.types.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('OrdersService', () => {
  const createService = () => {
    const orders: Array<Record<string, unknown>> = [];
    const prisma = {
      order: {
        create: async ({ data }: { data: Record<string, unknown> }) => {
          const created = {
            ...data,
            createdAt: new Date(),
            items: (data.items as { create: unknown[] }).create,
          };
          orders.push(created);
          return created;
        },
        findMany: async ({
          where,
        }: {
          where?: { userId?: string };
        }) =>
          where?.userId
            ? orders.filter((order) => order.userId === where.userId)
            : orders,
      },
    } as unknown as PrismaService;
    return new OrdersService(new ProductsService(), prisma);
  };

  it('tạo đơn hàng trạng thái PENDING và tính tổng tiền chính xác kèm size & topping', async () => {
    const service = createService();

    // Cà phê sữa đá (35.000) + Size M (+6.000) + Trân châu trắng (+5.000) = 46.000 * 2 = 92.000
    // Trà đào cam sả (39.000) + Size S (+0) = 39.000 * 1 = 39.000
    // Tổng = 131.000
    const order = await service.create({
      items: [
        {
          productId: 'coffee-001',
          size: DrinkSize.M,
          toppings: ['Trân châu trắng'],
          qty: 2,
        },
        {
          productId: 'tea-001',
          size: DrinkSize.S,
          qty: 1,
        },
      ],
      note: 'Ít đá giúp mình',
    });

    expect(order.id).toMatch(/^ORD-\d{8}-[0-9A-F]{4}$/);
    expect(order.status).toBe(OrderStatus.PENDING);
    expect(order.items).toHaveLength(2);
    expect(order.items[0].unitPrice).toBe(46000);
    expect(order.items[0].lineTotal).toBe(92000);
    expect(order.total).toBe(131000);
    expect(order.note).toBe('Ít đá giúp mình');
    expect(await service.findAll()).toHaveLength(1);
  });

  it('ném lỗi BadRequestException khi productId không tồn tại', async () => {
    const service = createService();

    await expect(
      service.create({
        items: [{ productId: 'invalid-id', size: DrinkSize.S, qty: 1 }],
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('chỉ trả về các đơn hàng thuộc tài khoản được yêu cầu', async () => {
    const service = createService();
    const dto = {
      items: [{ productId: 'coffee-001', size: DrinkSize.S, qty: 1 }],
    };

    await service.create(dto, 'USR-001');
    await service.create(dto, 'USR-002');

    const orders = await service.findByUserId('USR-001');
    expect(orders).toHaveLength(1);
    expect(orders[0].userId).toBe('USR-001');
  });
});
