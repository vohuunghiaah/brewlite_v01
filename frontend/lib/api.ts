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


// ===== AUTH API (TASK 7) =====

export interface AuthUser {
  id: string;
  email: string;
  loyaltyPoints: number;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

// Đăng ký tài khoản
export async function registerUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${getApiBaseUrl()}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMsg = Array.isArray(result.message)
      ? result.message.join(', ')
      : result.message;
    throw new Error(errorMsg || 'Đăng ký không thành công.');
  }

  return result as AuthResponse;
}

// Đăng nhập
export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMsg = Array.isArray(result.message)
      ? result.message.join(', ')
      : result.message;
    throw new Error(errorMsg || 'Đăng nhập không thành công.');
  }

  return result as AuthResponse;
}

// Lấy thông tin user hiện tại
export async function fetchUserProfile(token: string): Promise<AuthUser> {
  const response = await fetch(`${getApiBaseUrl()}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Không thể lấy thông tin người dùng.');
  }

  return result as AuthUser;
}

// ===== PAYMENT API (TASK 8) =====

export interface CreateOrderRequest {
  items: {
    productId: string;
    size: 'S' | 'M' | 'L';
    qty: number;
    toppings?: string[];
  }[];
  note?: string;
}

export interface CreateOrderResponse {
  id: string;
  userId?: string;
  status: string;
  total: number;
  createdAt: string;
}

export type PaymentMethod = 'WALLET' | 'CARD';

export interface PaymentResponse {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: 'SUCCESS' | 'FAILED';
  transactionId: string;
  createdAt: string;
}

export interface OrderHistoryItem {
  productId: string;
  productName: string;
  size: 'S' | 'M' | 'L';
  toppings: string[];
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderHistory {
  id: string;
  status:
    | 'PENDING'
    | 'PAID'
    | 'PAYMENT_FAILED'
    | 'PREPARING'
    | 'READY'
    | 'COMPLETED'
    | 'CANCELLED';
  items: OrderHistoryItem[];
  total: number;
  note?: string;
  createdAt: string;
}

export async function fetchMyOrders(token: string): Promise<OrderHistory[]> {
  const response = await fetch(`${getApiBaseUrl()}/orders/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });
  const result: unknown = await response.json();

  if (!response.ok) {
    const error = result as { message?: string | string[] };
    throw new Error(
      Array.isArray(error.message)
        ? error.message.join(', ')
        : error.message || 'Không thể tải lịch sử đơn hàng.',
    );
  }

  if (!Array.isArray(result)) {
    throw new Error('Dữ liệu lịch sử đơn hàng không hợp lệ.');
  }

  return result as OrderHistory[];
}

// Tạo đơn hàng
export async function createOrder(
  data: CreateOrderRequest,
  token?: string,
): Promise<CreateOrderResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || 'Không thể tạo đơn hàng.',
    );
  }

  return result as CreateOrderResponse;
}

// Thanh toán đơn hàng
export async function processPayment(
  orderId: string,
  method: PaymentMethod,
  idempotencyKey?: string,
): Promise<PaymentResponse> {
  const response = await fetch(`${getApiBaseUrl()}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      orderId,
      method,
      ...(idempotencyKey ? { idempotencyKey } : {}),
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || 'Thanh toán không thành công.',
    );
  }

  return result as PaymentResponse;
}
