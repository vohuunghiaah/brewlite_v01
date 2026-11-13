import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a non-empty list of products', () => {
      const products = service.findAll();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should ensure each product contains required fields (id, name, price, imageUrl)', () => {
      const products = service.findAll();
      for (const p of products) {
        expect(typeof p.id).toBe('string');
        expect(p.id.trim().length).toBeGreaterThan(0);

        expect(typeof p.name).toBe('string');
        expect(p.name.trim().length).toBeGreaterThan(0);

        expect(typeof p.price).toBe('number');
        expect(Number.isInteger(p.price)).toBe(true);
        expect(p.price).toBeGreaterThanOrEqual(0);

        expect(typeof p.imageUrl).toBe('string');
        expect(p.imageUrl.trim().length).toBeGreaterThan(0);
      }
    });

    it('should ensure each product has a unique id', () => {
      const products = service.findAll();
      const ids = products.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(products.length);
    });

    it('should return a defensive copy so mutations do not affect subsequent calls', () => {
      const firstCall = service.findAll();
      firstCall[0].name = 'Mutated Name';
      const secondCall = service.findAll();
      expect(secondCall[0].name).not.toBe('Mutated Name');
    });
  });
});
