import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { ProductsService } from '../products/products.service.js';
import { OrdersService } from './orders.service.js';
import { DrinkSize, OrderStatus } from './orders.types.js';

describe('OrdersService', () => {
  const createService = () => new OrdersService(new ProductsService());

  it('tạo đơn hàng trạng thái PENDING và tính tổng tiền chính xác kèm size & topping', () => {
    const service = createService();

    // Cà phê sữa đá (35.000) + Size M (+6.000) + Trân châu trắng (+5.000) = 46.000 * 2 = 92.000
    // Trà đào cam sả (39.000) + Size S (+0) = 39.000 * 1 = 39.000
    // Tổng = 131.000
    const order = service.create({
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
    expect(service.findAll()).toHaveLength(1);
  });

  it('ném lỗi BadRequestException khi productId không tồn tại', () => {
    const service = createService();

    expect(() =>
      service.create({
        items: [{ productId: 'invalid-id', size: DrinkSize.S, qty: 1 }],
      }),
    ).toThrow(BadRequestException);
  });
});
