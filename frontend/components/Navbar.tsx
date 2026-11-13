'use client';

export interface NavbarProps {
  onCartClick?: () => void;
  onHistoryClick?: () => void;
  onAccountClick?: () => void;
}

export default function Navbar({
  onCartClick,
  onHistoryClick,
  onAccountClick,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#382218] flex items-center justify-center text-white shadow-sm">
            <span className="text-xl" role="img" aria-label="coffee cup">
              ☕
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-black tracking-tight text-[#382218]">
              Brew
            </span>
            <span className="text-2xl font-bold tracking-tight text-amber-600">
              Lite
            </span>
          </div>
        </div>

        {/* Center / Navigation Icons */}
        <nav
          className="hidden md:flex items-center gap-6 text-stone-600"
          aria-label="Chuyển hướng chính"
        >
          <a
            href="#menu"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#382218] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Trang chủ</span>
          </a>

          <a
            href="#categories"
            className="flex items-center gap-1.5 text-sm font-medium hover:text-[#382218] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>Thực đơn</span>
          </a>

          {/* Lịch sử button (Task 9) */}
          <button
            type="button"
            onClick={onHistoryClick}
            className="flex items-center gap-1.5 text-sm font-medium hover:text-[#382218] transition-colors cursor-pointer"
            title="Lịch sử đơn hàng (Chức năng sẽ được triển khai ở Task 9)"
            aria-label="Xem lịch sử đơn hàng - Sắp ra mắt ở Task 9"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Lịch sử</span>
          </button>

          {/* Tài khoản button (Task 7) */}
          <button
            type="button"
            onClick={onAccountClick}
            className="flex items-center gap-1.5 text-sm font-medium hover:text-[#382218] transition-colors cursor-pointer"
            title="Tài khoản & Đăng nhập (Chức năng sẽ được triển khai ở Task 7)"
            aria-label="Tài khoản và Đăng nhập - Sắp ra mắt ở Task 7"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Tài khoản</span>
          </button>
        </nav>

        {/* Right Action: Cart button (Task 5) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCartClick}
            className="relative w-10 h-10 rounded-full bg-[#382218] hover:bg-[#4a2e21] text-white flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
            title="Giỏ hàng (Chức năng sẽ được triển khai ở Task 5)"
            aria-label="Giỏ hàng - Sắp ra mắt ở Task 5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
