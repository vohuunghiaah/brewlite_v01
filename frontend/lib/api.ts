import type { CategoryFilter, Product } from '../types/product';

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:3001';
}

/**
 * Validates a single product object at runtime.
 * Throws a descriptive Error if any required field is missing or invalid.
 */
export function validateProduct(item: unknown, index: number): Product {
  if (typeof item !== 'object' || item === null) {
    throw new Error(`Sản phẩm tại vị trí #${index} không phải là đối tượng hợp lệ.`);
  }

  const record = item as Record<string, unknown>;

  // id: non-empty string
  if (typeof record.id !== 'string' || record.id.trim().length === 0) {
    throw new Error(`Sản phẩm #${index} thiếu trường 'id' hoặc 'id' rỗng.`);
  }

  // name: non-empty string
  if (typeof record.name !== 'string' || record.name.trim().length === 0) {
    throw new Error(`Sản phẩm "${record.id}" thiếu trường 'name' hoặc 'name' rỗng.`);
  }

  // price: non-negative integer
  if (
    typeof record.price !== 'number' ||
    !Number.isInteger(record.price) ||
    record.price < 0
  ) {
    throw new Error(
      `Sản phẩm "${record.id}" có giá không hợp lệ (phải là số nguyên không âm): ${String(record.price)}.`,
    );
  }

  // imageUrl: non-empty string
  if (
    typeof record.imageUrl !== 'string' ||
    record.imageUrl.trim().length === 0
  ) {
    throw new Error(
      `Sản phẩm "${record.id}" thiếu trường 'imageUrl' hoặc 'imageUrl' rỗng.`,
    );
  }

  // category: optional string
  if (record.category !== undefined && typeof record.category !== 'string') {
    throw new Error(
      `Sản phẩm "${record.id}" có trường 'category' không đúng kiểu chuỗi.`,
    );
  }

  // description: optional string
  if (
    record.description !== undefined &&
    typeof record.description !== 'string'
  ) {
    throw new Error(
      `Sản phẩm "${record.id}" có trường 'description' không đúng kiểu chuỗi.`,
    );
  }

  // badge: optional string
  if (record.badge !== undefined && typeof record.badge !== 'string') {
    throw new Error(
      `Sản phẩm "${record.id}" có trường 'badge' không đúng kiểu chuỗi.`,
    );
  }

  return {
    id: record.id.trim(),
    name: record.name.trim(),
    price: record.price,
    imageUrl: record.imageUrl.trim(),
    category:
      typeof record.category === 'string' && record.category.trim().length > 0
        ? record.category.trim()
        : undefined,
    description:
      typeof record.description === 'string' &&
      record.description.trim().length > 0
        ? record.description.trim()
        : undefined,
    badge:
      typeof record.badge === 'string' && record.badge.trim().length > 0
        ? record.badge.trim()
        : undefined,
  };
}

/**
 * Validates the raw API response and ensures it is an array of valid products.
 */
export function validateProductList(data: unknown): Product[] {
  if (!Array.isArray(data)) {
    throw new Error('Dữ liệu API trả về không đúng định dạng danh sách (array).');
  }

  return data.map((item, index) => validateProduct(item, index));
}

export async function fetchProducts(baseUrl?: string): Promise<Product[]> {
  const url = `${baseUrl ?? getApiBaseUrl()}/products`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `Lỗi kết nối máy chủ API (${response.status}: ${response.statusText})`,
    );
  }

  const rawData: unknown = await response.json();
  return validateProductList(rawData);
}

export function formatVND(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0đ';
  }
  const formatted = new Intl.NumberFormat('vi-VN').format(amount);
  return `${formatted}đ`;
}

export function filterProducts(
  products: readonly Product[],
  category: CategoryFilter,
  searchQuery: string = '',
): Product[] {
  let result = [...products];

  if (category !== 'Tất cả') {
    result = result.filter((product) => product.category === category);
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  if (normalizedQuery.length > 0) {
    result = result.filter((product) => {
      const matchName = product.name.toLowerCase().includes(normalizedQuery);
      const matchDesc = product.description?.toLowerCase().includes(normalizedQuery);
      const matchCat = product.category?.toLowerCase().includes(normalizedQuery);
      return matchName || matchDesc || matchCat;
    });
  }

  return result;
}
