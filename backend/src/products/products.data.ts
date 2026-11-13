import type { Product } from './products.types.js';

/**
 * Dữ liệu mẫu đồ uống cho Task 2 (GET /products).
 * Các đường dẫn hình ảnh trỏ đến tài nguyên vector SVG cục bộ tại frontend/public/images/products/.
 */
export const SAMPLE_PRODUCTS: readonly Product[] = [
  {
    id: 'coffee-milk',
    name: 'Cà phê sữa',
    price: 35000,
    imageUrl: '/images/products/coffee-milk.svg',
  },
  {
    id: 'americano',
    name: 'Americano',
    price: 40000,
    imageUrl: '/images/products/americano.svg',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 45000,
    imageUrl: '/images/products/cappuccino.svg',
  },
  {
    id: 'peach-tea',
    name: 'Trà đào',
    price: 39000,
    imageUrl: '/images/products/peach-tea.svg',
  },
];
