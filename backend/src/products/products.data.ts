import { Product } from './products.types.js';

/**
 * Danh sách sản phẩm chính thức được đối chiếu và trích xuất trực tiếp
 * từ thiết kế Figma Make App: https://www.figma.com/make/2bPJMAlevBhb3qpiYwGBnQ/BrewLite-Coffee-Ordering-App
 */
export const SAMPLE_PRODUCTS: readonly Product[] = Object.freeze([
  {
    id: 'coffee-001',
    name: 'Cà phê sữa đá',
    price: 35000,
    imageUrl: '/products/coffee-001.svg',
    category: 'Cà phê truyền thống',
    description: 'Cà phê phin truyền thống pha với sữa đặc, đậm đà hương vị Việt Nam.',
    badge: 'Bán chạy',
  },
  {
    id: 'coffee-002',
    name: 'Americano',
    price: 40000,
    imageUrl: '/products/coffee-002.svg',
    category: 'Cold Brew & Espresso',
    description: 'Espresso pha loãng với nước nóng, thanh đậm và tinh tế.',
  },
  {
    id: 'coffee-003',
    name: 'Cappuccino nóng',
    price: 45000,
    imageUrl: '/products/coffee-003.svg',
    category: 'Cold Brew & Espresso',
    description: 'Espresso với lớp bọt sữa dày mịn, vị cân bằng hoàn hảo.',
    badge: 'Mới',
  },
  {
    id: 'tea-001',
    name: 'Trà đào cam sả',
    price: 39000,
    imageUrl: '/products/tea-001.svg',
    category: 'Trà trái cây',
    description: 'Trà xanh pha trái đào tươi, cam và sả, thơm mát sảng khoái.',
    badge: 'Yêu thích',
  },
  {
    id: 'coffee-004',
    name: 'Cold Brew Muối',
    price: 42000,
    imageUrl: '/products/coffee-004.svg',
    category: 'Cold Brew & Espresso',
    description: 'Cold brew ngâm 24 giờ với kem muối béo ngậy, phong cách Đài Loan.',
    badge: 'Hot Trend',
  },
  {
    id: 'bakery-001',
    name: 'Bánh sừng bò sô-cô-la',
    price: 35000,
    imageUrl: '/products/bakery-001.svg',
    category: 'Bánh ngọt',
    description: 'Bánh sừng bò bơ Pháp nhân sô-cô-la đen, nướng giòn tươi mỗi sáng.',
  },
]);
