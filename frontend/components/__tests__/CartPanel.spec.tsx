import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import CartPanel from '../CartPanel';
import Navbar from '../Navbar';
import { CartProvider, useCart } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import type { Product } from '../../types/product';

const PRODUCT: Product = {
  id: 'coffee-001',
  name: 'Cà phê sữa đá',
  price: 35000,
  imageUrl: '/products/coffee-001.svg',
};

function CartHarness() {
  const { addItem, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar cartItemCount={itemCount} onCartClick={() => setIsOpen(true)} />
      <button
        type="button"
        onClick={() =>
          addItem({ product: PRODUCT, size: 'M', toppings: [], quantity: 1 })
        }
      >
        Add coffee
      </button>
      {isOpen && <CartPanel onClose={() => setIsOpen(false)} />}
    </>
  );
}

describe('CartPanel', () => {
  afterEach(() => {
    cleanup();
  });

  it('updates the badge and total, then removes an item from the cart', () => {
    render(
      <AuthProvider>
        <CartProvider>
          <CartHarness />
        </CartProvider>
      </AuthProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add coffee' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add coffee' }));
    expect(
      screen.getByRole('button', { name: 'Giỏ hàng (2 món)' }),
    ).toBeDefined();

    fireEvent.click(
      screen.getByRole('button', { name: 'Giỏ hàng (2 món)' }),
    );
    expect(screen.getByRole('dialog', { name: 'Giỏ hàng' })).toBeDefined();
    expect(screen.getAllByText('70.000đ')).toHaveLength(2);

    fireEvent.click(
      screen.getByRole('button', { name: 'Tăng số lượng Cà phê sữa đá' }),
    );
    expect(screen.getAllByText('105.000đ')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Giỏ hàng (3 món)' }),
    ).toBeDefined();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Xóa Cà phê sữa đá khỏi giỏ',
      }),
    );
    expect(screen.getByText('Giỏ hàng đang trống')).toBeDefined();
    expect(
      screen.getByRole('button', { name: 'Giỏ hàng (0 món)' }),
    ).toBeDefined();
  });
});
