import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Product } from '../../types/product';
import MenuPage from '../MenuPage';
import Navbar from '../Navbar';

const MOCK_MENU: Product[] = [
  {
    id: 'coffee-001',
    name: 'Cà phê sữa đá',
    price: 35000,
    imageUrl: '/products/coffee-001.svg',
    category: 'Cà phê truyền thống',
    description: 'Cà phê phin truyền thống pha với sữa đặc',
    badge: 'Bán chạy',
  },
  {
    id: 'coffee-002',
    name: 'Americano',
    price: 40000,
    imageUrl: '/products/coffee-002.svg',
    category: 'Cold Brew & Espresso',
    description: 'Espresso pha loãng với nước nóng',
  },
  {
    id: 'tea-001',
    name: 'Trà đào cam sả',
    price: 39000,
    imageUrl: '/products/tea-001.svg',
    category: 'Trà trái cây',
    description: 'Trà xanh pha trái đào tươi, cam và sả',
    badge: 'Yêu thích',
  },
];

describe('MenuPage & Component UI Testing', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('1. Loading State', () => {
    it('should display skeleton loading initially while API is pending', () => {
      // Mock fetch never resolving immediately
      global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));

      render(<MenuPage />);

      // Check for loading skeleton status
      const skeleton = screen.getByRole('status', {
        name: /Đang tải danh sách món ăn/i,
      });
      expect(skeleton).toBeDefined();
      expect(screen.getByText(/Đang tải dữ liệu thực đơn/i)).toBeDefined();
    });
  });

  describe('2. API Success State & Product Grid', () => {
    it('should fetch and render 3 products from API payload', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => MOCK_MENU,
      });

      render(<MenuPage />);

      // Wait for products to render
      await waitFor(() => {
        expect(screen.getByText('Cà phê sữa đá')).toBeDefined();
      });

      expect(screen.getByText('Americano')).toBeDefined();
      expect(screen.getByText('Trà đào cam sả')).toBeDefined();
      expect(screen.getByText('(3)')).toBeDefined();
      expect(screen.getByText('Bán chạy')).toBeDefined();
      expect(screen.getAllByText('Yêu thích').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('3. API Error State & Retry mechanism', () => {
    it('should render ErrorState when API fails and retry when button is clicked', async () => {
      // First call fails
      const mockFetch = vi
        .fn()
        .mockRejectedValueOnce(new Error('Network offline or backend stopped'))
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => MOCK_MENU,
        });
      global.fetch = mockFetch;

      render(<MenuPage />);

      // Wait for error state
      await waitFor(() => {
        expect(
          screen.getByText(/Không thể kết nối đến máy chủ thực đơn/i),
        ).toBeDefined();
      });

      expect(
        screen.getByText(/Network offline or backend stopped/i),
      ).toBeDefined();

      // Click "Thử lại kết nối"
      const retryButton = screen.getByRole('button', {
        name: /Thử lại kết nối/i,
      });
      fireEvent.click(retryButton);

      // Now it should successfully load
      await waitFor(() => {
        expect(screen.getByText('Cà phê sữa đá')).toBeDefined();
      });
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('4. Category Filtering & Empty State', () => {
    it('should filter products when category pill is selected', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => MOCK_MENU,
      });

      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('Cà phê sữa đá')).toBeDefined();
      });

      // Filter by "Cà phê truyền thống"
      const coffeeCatButton = screen.getByRole('button', {
        name: 'Cà phê truyền thống',
      });
      fireEvent.click(coffeeCatButton);

      expect(screen.getByText('(1)')).toBeDefined();
      expect(screen.getByText('Cà phê sữa đá')).toBeDefined();
      expect(screen.queryByText('Americano')).toBeNull();
      expect(screen.queryByText('Trà đào cam sả')).toBeNull();

      // Filter by "Tất cả" to restore
      const allCatButton = screen.getByRole('button', { name: 'Tất cả' });
      fireEvent.click(allCatButton);

      expect(screen.getByText('(3)')).toBeDefined();
      expect(screen.getByText('Americano')).toBeDefined();
    });

    it('should display EmptyState when search query has no match and allow reset', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => MOCK_MENU,
      });

      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('Cà phê sữa đá')).toBeDefined();
      });

      const searchInput = screen.getByPlaceholderText(
        /Tìm cà phê, trà, bánh/i,
      );
      fireEvent.change(searchInput, { target: { value: 'mon-khong-ton-tai' } });

      // Empty state should be visible
      expect(screen.getByText(/Không tìm thấy món nào/i)).toBeDefined();
      expect(
        screen.getByText(/Không có món nào khớp với từ khóa/i),
      ).toBeDefined();

      // Click reset button
      const resetButton = screen.getByRole('button', {
        name: /Xem tất cả món/i,
      });
      fireEvent.click(resetButton);

      expect(screen.getByText('Cà phê sữa đá')).toBeDefined();
      expect(screen.getByText('(3)')).toBeDefined();
    });
  });

  describe('5. Interactive Action Scope Notices (Customize & Quick Add)', () => {
    it('should trigger appropriate notices when Customize or Quick Add are clicked', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => MOCK_MENU,
      });

      const noticeSpy = vi.fn();
      render(<MenuPage onNotice={noticeSpy} />);

      await waitFor(() => {
        expect(screen.getByText('Cà phê sữa đá')).toBeDefined();
      });

      // Click Customize
      const customizeButtons = screen.getAllByRole('button', {
        name: /Tùy chỉnh/i,
      });
      fireEvent.click(customizeButtons[0]);

      expect(noticeSpy).toHaveBeenCalledWith(
        expect.stringContaining('Task 4'),
      );

      // Click Quick Add
      const addButtons = screen.getAllByRole('button', {
        name: /Thêm nhanh/i,
      });
      fireEvent.click(addButtons[0]);

      expect(noticeSpy).toHaveBeenCalledWith(
        expect.stringContaining('Task 5'),
      );
    });
  });

  describe('6. Navbar Placeholder Interactions', () => {
    it('should call distinct callbacks for Cart, History, and Account buttons', () => {
      const onCartClick = vi.fn();
      const onHistoryClick = vi.fn();
      const onAccountClick = vi.fn();

      render(
        <Navbar
          onCartClick={onCartClick}
          onHistoryClick={onHistoryClick}
          onAccountClick={onAccountClick}
        />,
      );

      // Cart
      const cartButton = screen.getByRole('button', {
        name: /Giỏ hàng - Sắp ra mắt ở Task 5/i,
      });
      fireEvent.click(cartButton);
      expect(onCartClick).toHaveBeenCalledTimes(1);

      // History
      const historyButton = screen.getByRole('button', {
        name: /Xem lịch sử đơn hàng/i,
      });
      fireEvent.click(historyButton);
      expect(onHistoryClick).toHaveBeenCalledTimes(1);

      // Account
      const accountButton = screen.getByRole('button', {
        name: /Tài khoản và Đăng nhập/i,
      });
      fireEvent.click(accountButton);
      expect(onAccountClick).toHaveBeenCalledTimes(1);
    });
  });
});
