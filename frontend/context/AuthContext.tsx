'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { decodeToken, getToken, logout as clearToken } from '@/lib/auth';

interface User {
  sub: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  ready: boolean;
  logout: () => void;
  setUserFromToken: (token: string) => void; // ✅ Added method
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const setUserFromToken = (token: string) => {
    try {
      const decoded = decodeToken(token);
      setUser({ sub: decoded.sub, role: decoded.role });
    } catch {
      clearToken();
      setUser(null);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUserFromToken(token);
    }
    setReady(true);
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const isLoggedIn = useMemo(() => !!user, [user]);
  const isAdmin = useMemo(() => user?.role === 'ADMIN', [user]);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isAdmin, logout, ready, setUserFromToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
