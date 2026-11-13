import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Product } from '../types/product';
import {
  fetchProducts,
  filterProducts,
  formatVND,
  getApiBaseUrl,
} from './api';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'coffee-001',
    name: 'Cà phê sữa đá',
    price: 35000,
    imageUrl: '/products/coffee-001.svg',
    category: 'Cà phê truyền thống',
    description: 'Cà phê phin truyền thống pha với sữa đặc',
    badge: 'Bán chạy',
  },
  {
    id: 'coffee-002',
    name: 'Americano',
    price: 40000,
    imageUrl: '/products/coffee-002.svg',
    category: 'Cold Brew & Espresso',
    description: 'Espresso pha loãng với nước nóng',
  },
  {
    id: 'tea-001',
    name: 'Trà đào cam sả',
    price: 39000,
    imageUrl: '/products/tea-001.svg',
    category: 'Trà trái cây',
    description: 'Trà xanh pha trái đào tươi, cam và sả',
    badge: 'Yêu thích',
  },
];

describe('Frontend API & Utilities', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  describe('getApiBaseUrl', () => {
    it('should fallback to http://localhost:3001 if env is unset', () => {
      delete process.env.NEXT_PUBLIC_API_URL;
      expect(getApiBaseUrl()).toBe('http://localhost:3001');
    });

    it('should use NEXT_PUBLIC_API_URL when provided', () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://api.brewlite.local:8080/';
      expect(getApiBaseUrl()).toBe('http://api.brewlite.local:8080');
    });
  });

  describe('formatVND', () => {
    it('should format numbers with thousands separators and đ symbol', () => {
      expect(formatVND(35000)).toMatch(/35[.,]000đ/);
      expect(formatVND(42000)).toMatch(/42[.,]000đ/);
    });

    it('should return 0đ for zero or invalid input', () => {
      expect(formatVND(0)).toBe('0đ');
      expect(formatVND(NaN)).toBe('0đ');
    });
  });

  describe('filterProducts', () => {
    it('should return all products when category is "Tất cả" and no search query', () => {
      const result = filterProducts(MOCK_PRODUCTS, 'Tất cả', '');
      expect(result).toHaveLength(3);
    });

    it('should filter by specific category', () => {
      const coffeeResult = filterProducts(
        MOCK_PRODUCTS,
        'Cà phê truyền thống',
        '',
      );
      expect(coffeeResult).toHaveLength(1);
      expect(coffeeResult[0].id).toBe('coffee-001');

      const teaResult = filterProducts(MOCK_PRODUCTS, 'Trà trái cây', '');
      expect(teaResult).toHaveLength(1);
      expect(teaResult[0].id).toBe('tea-001');
    });

    it('should filter by search query matching product name', () => {
      const result = filterProducts(MOCK_PRODUCTS, 'Tất cả', 'americano');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('coffee-002');
    });

    it('should filter by search query matching description', () => {
      const result = filterProducts(MOCK_PRODUCTS, 'Tất cả', 'sữa đặc');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('coffee-001');
    });

    it('should return empty array if no product matches criteria', () => {
      const result = filterProducts(MOCK_PRODUCTS, 'Bánh ngọt', '');
      expect(result).toHaveLength(0);
    });
  });

  describe('fetchProducts', () => {
    it('should successfully fetch and return array of products', async () => {
      const fakeFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => MOCK_PRODUCTS,
      });
      global.fetch = fakeFetch as unknown as typeof fetch;

      const data = await fetchProducts('http://mock-api:3001');
      expect(fakeFetch).toHaveBeenCalledWith(
        'http://mock-api:3001/products',
        expect.objectContaining({ method: 'GET' }),
      );
      expect(data).toHaveLength(3);
      expect(data[0].name).toBe('Cà phê sữa đá');
    });

    it('should throw an error when API response is not ok', async () => {
      const fakeFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });
      global.fetch = fakeFetch as unknown as typeof fetch;

      await expect(fetchProducts('http://mock-api:3001')).rejects.toThrow(
        /Lỗi kết nối máy chủ API \(500/,
      );
    });

    it('should throw an error when API returns non-array payload', async () => {
      const fakeFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ message: 'Not an array' }),
      });
      global.fetch = fakeFetch as unknown as typeof fetch;

      await expect(fetchProducts('http://mock-api:3001')).rejects.toThrow(
        /không đúng định dạng mảng/,
      );
    });
  });
});
