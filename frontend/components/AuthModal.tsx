'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultMode?: 'login' | 'register';
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  defaultMode = 'login',
}: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Đã có lỗi xảy ra. Vui lòng thử lại.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Tabs */}
        <div className="flex border-b border-stone-100 bg-stone-50/50">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-4 text-center font-bold text-sm tracking-wide transition-colors ${
              mode === 'login'
                ? 'text-[#382218] border-b-2 border-[#382218] bg-white'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-4 text-center font-bold text-sm tracking-wide transition-colors ${
              mode === 'register'
                ? 'text-[#382218] border-b-2 border-[#382218] bg-white'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Đăng ký tài khoản
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center mb-2">
            <h3 className="text-xl font-black text-[#382218]">
              {mode === 'login'
                ? 'Chào mừng bạn quay lại!'
                : 'Tạo tài khoản BrewLite mới'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {mode === 'login'
                ? 'Đăng nhập để đặt nước và tích điểm thành viên'
                : 'Nhập thông tin để bắt đầu trải nghiệm đặt nước không tiền mặt'}
            </p>
          </div>

          {error && (
            <div className="p-3 text-xs rounded-xl bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              Địa chỉ Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@brewlite.vn"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              Mật khẩu {mode === 'register' && '(tối thiểu 6 ký tự)'}
            </label>
            <input
              type="password"
              required
              minLength={mode === 'register' ? 6 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#382218] hover:bg-[#4a2e21] rounded-xl transition shadow-sm disabled:opacity-50"
            >
              {loading
                ? 'Đang xử lý...'
                : mode === 'login'
                  ? 'Đăng nhập ngay'
                  : 'Tạo tài khoản'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
