'use client';

import { useState } from 'react';
import Footer from '../components/Footer';
import MenuPage from '../components/MenuPage';
import Navbar from '../components/Navbar';
import ToastNotice from '../components/ToastNotice';

export default function Home() {
  const [notice, setNotice] = useState<string | null>(null);

  const handleCartClick = () => {
    setNotice(
      'Chức năng Giỏ hàng và Quản lý đơn hàng sẽ được triển khai ở Task 5.',
    );
  };

  const handleHistoryClick = () => {
    setNotice(
      'Chức năng Lịch sử đơn hàng (GET /orders/me) sẽ được triển khai ở Task 9.',
    );
  };

  const handleAccountClick = () => {
    setNotice(
      'Chức năng Tài khoản & Đăng nhập (POST /auth/login) sẽ được triển khai ở Task 7.',
    );
  };

  const handleNotice = (msg: string) => {
    setNotice(msg);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans antialiased">
      <Navbar
        onCartClick={handleCartClick}
        onHistoryClick={handleHistoryClick}
        onAccountClick={handleAccountClick}
      />
      <MenuPage onNotice={handleNotice} />
      <Footer />
      <ToastNotice message={notice} onClose={() => setNotice(null)} />
    </div>
  );
}
