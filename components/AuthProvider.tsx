'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('quickbg_user');
    if (data) {
      try { setUser(JSON.parse(data)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: _password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      const u: User = { email: data.user.email, plan: data.user.plan, credits: data.user.credits, token: data.token };
      localStorage.setItem('quickbg_user', JSON.stringify(u));
      setUser(u);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      const u: User = { email: data.user.email, plan: data.user.plan, credits: data.user.credits, token: data.token };
      localStorage.setItem('quickbg_user', JSON.stringify(u));
      setUser(u);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('quickbg_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
