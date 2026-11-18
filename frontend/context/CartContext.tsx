
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { calculateUnitPrice, getCartItemKey } from '../lib/cart';
import type { CartItem, CartItemSelection } from '../types/cart';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (selection: CartItemSelection) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((selection: CartItemSelection) => {
    const key = getCartItemKey(selection);
    const unitPrice = calculateUnitPrice(
      selection.product.price,
      selection.size,
      selection.toppings,
    );

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.key === key);

      if (existingItem) {
        return currentItems.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + selection.quantity }
            : item,
        );
      }

      return [...currentItems, { ...selection, key, unitPrice }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((currentItems) =>
      quantity < 1
        ? currentItems.filter((item) => item.key !== key)
        : currentItems.map((item) =>
            item.key === key ? { ...item, quantity } : item,
          ),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.key !== key));
  }, []);

  // Xóa toàn bộ giỏ hàng sau khi thanh toán thành công
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      total: items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      ),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, addItem, updateQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart phải được dùng bên trong CartProvider.');
  }

  return context;
}
