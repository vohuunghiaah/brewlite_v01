import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { Product } from './products.types.js';

describe('ProductsController', () => {
  let controller: ProductsController;
  let findAllMock: ReturnType<typeof vi.fn>;

  const mockProducts: Product[] = [
    {
      id: 'test-001',
      name: 'Test Coffee',
      price: 35000,
      imageUrl: '/products/test-001.svg',
      category: 'Cà phê',
      description: 'Test description',
    },
  ];

  beforeEach(async () => {
    findAllMock = vi.fn().mockReturnValue(mockProducts);

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
    it('should call productsService.findAll and return the product list', () => {
      const result = controller.findAll();
      expect(findAllMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProducts);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-001');
    });
  });
});
