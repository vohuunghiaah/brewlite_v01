import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AuthModal from '../AuthModal';
import { AuthProvider } from '../../context/AuthContext';

describe('AuthModal', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders modal with login mode and switches between tabs', () => {
    const handleClose = vi.fn();

    render(
      <AuthProvider>
        <AuthModal isOpen={true} onClose={handleClose} />
      </AuthProvider>,
    );

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Đăng nhập' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Đăng ký tài khoản' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Đăng nhập ngay' })).toBeDefined();

    // Switch to register tab
    fireEvent.click(screen.getByRole('button', { name: 'Đăng ký tài khoản' }));
    expect(screen.getByRole('button', { name: 'Tạo tài khoản' })).toBeDefined();
    expect(screen.getByText('Tạo tài khoản BrewLite mới')).toBeDefined();

    // Switch back to login
    fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));
    expect(screen.getByRole('button', { name: 'Đăng nhập ngay' })).toBeDefined();
    expect(screen.getByText('Chào mừng bạn quay lại!')).toBeDefined();

    // Click close
    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
