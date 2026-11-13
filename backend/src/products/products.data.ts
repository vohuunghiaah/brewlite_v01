import { Product } from './products.types.js';

export const SAMPLE_PRODUCTS: readonly Product[] = Object.freeze([
  {
    id: 'coffee-001',
    name: 'Cà phê sữa',
    price: 35000,
    imageUrl: '/products/coffee-001.svg',
    category: 'Cà phê',
    description: 'Cà phê pha phin truyền thống kết hợp cùng sữa đặc béo ngọt thơm ngon.',
  },
  {
    id: 'coffee-002',
    name: 'Americano',
    price: 40000,
    imageUrl: '/products/coffee-002.svg',
    category: 'Cà phê',
    description: 'Espresso đậm đà pha loãng với nước nóng, vị đắng thanh thoát.',
  },
  {
    id: 'coffee-003',
    name: 'Cappuccino',
    price: 45000,
    imageUrl: '/products/coffee-003.svg',
    category: 'Cà phê',
    description: 'Espresso hòa quyện sữa nóng với lớp bọt sữa bồng bềnh mịn màng.',
  },
  {
    id: 'tea-001',
    name: 'Trà đào',
    price: 39000,
    imageUrl: '/products/tea-001.svg',
    category: 'Trà',
    description: 'Trà đen ướp hương đào thơm mát kèm miếng đào ngâm giòn ngọt thanh nhẹ.',
  },
  {
    id: 'coffee-004',
    name: 'Espresso',
    price: 30000,
    imageUrl: '/products/coffee-004.svg',
    category: 'Cà phê',
    description: 'Cà phê nguyên chất chiết xuất áp suất cao với lớp crema dày quyến rũ.',
  },
  {
    id: 'tea-002',
    name: 'Trà sữa trân châu',
    price: 42000,
    imageUrl: '/products/tea-002.svg',
    category: 'Trà',
    description: 'Trà sữa đậm vị hồng trà truyền thống hòa quyện cùng trân châu dẻo dai.',
  },
]);
