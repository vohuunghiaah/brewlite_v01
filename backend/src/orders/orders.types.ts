
export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum DrinkSize {
  S = 'S',
  M = 'M',
  L = 'L',
}

export const SIZE_SURCHARGE: Readonly<Record<DrinkSize, number>> =
  Object.freeze({
    [DrinkSize.S]: 0,
    [DrinkSize.M]: 6000,
    [DrinkSize.L]: 12000,
  });

export const TOPPING_PRICES: Readonly<Record<string, number>> = Object.freeze({
  'Trân châu trắng': 5000,
  'Thạch cà phê': 5000,
  'Shot espresso': 10000,
  'Kem cheese': 10000,
  'Kem cheese macchiato': 10000,
});

export interface OrderItem {
  readonly productId: string;
  readonly productName: string;
  readonly size: DrinkSize;
  readonly toppings: readonly string[];
  readonly qty: number;
  readonly unitPrice: number;
  readonly lineTotal: number;
}

export interface Order {
  readonly id: string;
  readonly userId?: string;
  readonly status: OrderStatus;
  readonly items: readonly OrderItem[];
  readonly total: number;
  readonly note?: string;
  readonly createdAt: string;
}