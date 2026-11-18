'use client';

import { useState } from 'react';
import AuthModal from '../components/AuthModal';
import CartPanel from '../components/CartPanel';
import Footer from '../components/Footer';
import MenuPage from '../components/MenuPage';
import Navbar from '../components/Navbar';
import ToastNotice from '../components/ToastNotice';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CartProvider, useCart } from '../context/CartContext';
import type { CartItemSelection } from '../types/cart';
import type { Product } from '../types/product';

export default function Home() {
  return (
    <AuthProvider>
      <CartProvider>
        <HomeContent />
      </CartProvider>
    </AuthProvider>
  );
}

function HomeContent() {
  const { addItem, itemCount } = useCart();
  const { user, logout } = useAuth();
  const [notice, setNotice] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAccountClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleNotice = (msg: string) => {
    setNotice(msg);
  };

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
        user={user}
        onLogout={logout}
        cartItemCount={itemCount}
        onCartClick={() => setIsCartOpen(true)}
        onAccountClick={handleAccountClick}
      />
      <MenuPage
        onAddToCart={addItem}
        onQuickAdd={handleQuickAdd}
        onNotice={handleNotice}
      />
      <Footer />
      {isCartOpen && <CartPanel onClose={() => setIsCartOpen(false)} />}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => {
            setNotice('Đăng nhập thành công!');
          }}
        />
      )}
      <ToastNotice message={notice} onClose={() => setNotice(null)} />
    </div>
  );
}
