'use client';

import { useState } from 'react';
import CartPanel from '../components/CartPanel';
import Footer from '../components/Footer';
import MenuPage from '../components/MenuPage';
import Navbar from '../components/Navbar';
import ToastNotice from '../components/ToastNotice';
import AuthModal from '../components/AuthModal';
import { CartProvider, useCart } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import type { CartItemSelection } from '../types/cart';
import type { Product } from '../types/product';

export default function Home() {
  return (
    <CartProvider>
      <AuthProvider>
        <HomeContent />
      </AuthProvider>
    </CartProvider>
  );
}

function HomeContent() {
  const { addItem, itemCount } = useCart();
  const [notice, setNotice] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleHistoryClick = () => {
    setNotice('Lịch sử đơn hàng sẽ được triển khai ở Task 9.');
  };

  const handleAccountClick = () => {
    setIsAuthOpen(true);
  };

  const handleNotice = (msg: string) => setNotice(msg);

  const handleQuickAdd = (product: Product) => {
    const selection: CartItemSelection = {
      product,
      size: 'M',
      toppings: [],
      quantity: 1,
    };
    addItem(selection);
    setNotice(`Đã thêm ${product.name} size M vào giỏ hàng.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans antialiased">
      <Navbar
        cartItemCount={itemCount}
        onCartClick={() => setIsCartOpen(true)}
        onHistoryClick={handleHistoryClick}
        onAccountClick={handleAccountClick}
      />
      <MenuPage
        onAddToCart={addItem}
        onQuickAdd={handleQuickAdd}
        onNotice={handleNotice}
      />
      <Footer />
      {isCartOpen && <CartPanel onClose={() => setIsCartOpen(false)} />}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
      <ToastNotice message={notice} onClose={() => setNotice(null)} />
    </div>
  );
}
