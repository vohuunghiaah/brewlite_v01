export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  description?: string;
  badge?: string;
}

export type CategoryFilter =
  | 'Tất cả'
  | 'Cà phê truyền thống'
  | 'Cold Brew & Espresso'
  | 'Trà trái cây'
  | 'Bánh ngọt';

export const CATEGORIES: readonly CategoryFilter[] = [
  'Tất cả',
  'Cà phê truyền thống',
  'Cold Brew & Espresso',
  'Trà trái cây',
  'Bánh ngọt',
] as const;
