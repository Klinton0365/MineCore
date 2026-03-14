'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthContext } from '@/lib/auth';
import { api } from '@/lib/api';
import type { User, AuthResponse } from '@/lib/types';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem('auth_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }
      setToken(storedToken);
      const data = await api.get<User>('/auth/user');
      setUser(data);
    } catch {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const data = await api.post<AuthResponse>('/auth/login', { email, password });
    localStorage.setItem('auth_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext>
  );
}
