'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { decodeToken, getToken, logout as clearToken } from '@/lib/auth';


interface User {
  sub: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    try {
      const decoded = decodeToken(token);
      setUser({ sub: decoded.sub, role: decoded.role });
    } catch {
      clearToken();
      setUser(null);
    }
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
