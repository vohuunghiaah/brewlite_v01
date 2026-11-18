'use client';

import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setBusy(true);

    try {
      if (mode === 'register') {
        await register(email.trim(), password);
        setMessage('Đăng ký thành công! Hãy đăng nhập.');
        setMode('login');
        setPassword('');
      } else {
        await login(email.trim(), password);
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-[#382218]">
            {mode === 'login' ? 'Đăng nhập BrewLite' : 'Tạo tài khoản'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-stone-500 hover:text-stone-900"
            aria-label="Đóng"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ít nhất 6 ký tự"
              className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#382218] text-white rounded-lg py-3 font-semibold hover:bg-[#4a2e21] disabled:opacity-50"
          >
            {busy ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <div className="text-center text-sm mt-5">
          {mode === 'login' ? (
            <>
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                  setMessage('');
                }}
                className="font-semibold text-amber-700"
              >
                Đăng ký
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                  setMessage('');
                }}
                className="font-semibold text-amber-700"
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
