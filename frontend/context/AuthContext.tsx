'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getApiBaseUrl } from '../lib/api';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('brewlite_token');
    const savedUser = sessionStorage.getItem('brewlite_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const saveAuth = (data: any) => {
    const accessToken = data.accessToken;
    const account = data.user;

    if (!accessToken || !account) {
      throw new Error('Máy chủ không trả về thông tin đăng nhập hợp lệ.');
    }

    sessionStorage.setItem('brewlite_token', accessToken);
    sessionStorage.setItem('brewlite_user', JSON.stringify(account));
    setToken(accessToken);
    setUser(account);
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Đăng nhập thất bại.');
    }

    saveAuth(data);
  };

  const register = async (email: string, password: string) => {
    const response = await fetch(`${getApiBaseUrl()}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Đăng ký thất bại.');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('brewlite_token');
    sessionStorage.removeItem('brewlite_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider.');
  }

  return context;
}
