import type { CategoryFilter, Product } from '../types/product';

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:3001';
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
    throw new Error(`Lỗi kết nối máy chủ API (${response.status}: ${response.statusText})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Dữ liệu API trả về không đúng định dạng mảng sản phẩm');
  }

  return data as Product[];
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
