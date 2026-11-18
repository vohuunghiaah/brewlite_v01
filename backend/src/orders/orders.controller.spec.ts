import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { DrinkSize, Order, OrderStatus } from './orders.types.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

describe('OrdersController', () => {
  let controller: OrdersController;
  let createMock: ReturnType<typeof vi.fn>;

  const mockOrder: Order = {
    id: 'ORD-20261118-ABCD',
    status: OrderStatus.PENDING,
    items: [
      {
        productId: 'coffee-001',
        productName: 'Cà phê sữa đá',
        size: DrinkSize.M,
        toppings: ['Trân châu trắng'],
        qty: 1,
        unitPrice: 49000,
        lineTotal: 49000,
      },
    ],
    total: 49000,
    note: 'Ít đường',
    createdAt: new Date().toISOString(),
  };

  beforeEach(async () => {
    createMock = vi.fn().mockResolvedValue(mockOrder);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            create: createMock,
            findByUserId: vi.fn().mockResolvedValue([mockOrder]),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call ordersService.create with dto and userId and return the created order', async () => {
      const dto: CreateOrderDto = {
        items: [
          {
            productId: 'coffee-001',
            size: DrinkSize.M,
            toppings: ['Trân châu trắng'],
            qty: 1,
          },
        ],
        note: 'Ít đường',
      };

      const result = await controller.create(dto, 'USR-001');
      expect(createMock).toHaveBeenCalledWith(dto, 'USR-001');
      expect(result).toEqual(mockOrder);
      expect(result.status).toBe(OrderStatus.PENDING);
    });

    it('returns only the authenticated user orders', async () => {
      await expect(controller.findMine('USR-001')).resolves.toEqual([mockOrder]);
    });
  });
});
