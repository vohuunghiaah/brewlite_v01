import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import type { Product } from './products.types.js';

describe('ProductsController', () => {
  let controller: ProductsController;
  const findAllMock = vi.fn<[], Product[]>();

  const mockProducts: Product[] = [
    {
      id: 'mock-1',
      name: 'Mock Coffee',
      price: 30000,
      imageUrl: '/images/products/mock.svg',
    },
  ];

  beforeEach(async () => {
    findAllMock.mockReset();
    findAllMock.mockReturnValue(mockProducts);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: findAllMock,
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should delegate to ProductsService.findAll and return products', () => {
      const result = controller.findAll();
      expect(findAllMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProducts);
    });
  });
});
