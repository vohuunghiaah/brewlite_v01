import { describe, it, expect, beforeEach } from 'vitest';
import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const products = service.findAll();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should ensure each product has all required fields with valid types', () => {
      const products = service.findAll();
      for (const product of products) {
        expect(typeof product.id).toBe('string');
        expect(product.id.trim().length).toBeGreaterThan(0);

        expect(typeof product.name).toBe('string');
        expect(product.name.trim().length).toBeGreaterThan(0);

        expect(typeof product.price).toBe('number');
        expect(Number.isInteger(product.price)).toBe(true);
        expect(product.price).toBeGreaterThanOrEqual(0);

        expect(typeof product.imageUrl).toBe('string');
        expect(product.imageUrl.trim().length).toBeGreaterThan(0);
      }
    });

    it('should ensure all product IDs are unique', () => {
      const products = service.findAll();
      const ids = products.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should return a new array reference on each call', () => {
      const firstCall = service.findAll();
      const secondCall = service.findAll();
      expect(firstCall).not.toBe(secondCall);
      expect(firstCall).toEqual(secondCall);
    });

    it('should correctly expose Figma badges for highlighted products', () => {
      const products = service.findAll();
      const productMap = new Map(products.map((p) => [p.id, p]));
      expect(productMap.get('coffee-001')?.badge).toBe('Bán chạy');
      expect(productMap.get('coffee-003')?.badge).toBe('Mới');
      expect(productMap.get('tea-001')?.badge).toBe('Yêu thích');
      expect(productMap.get('coffee-004')?.badge).toBe('Hot Trend');
    });
  });
});
