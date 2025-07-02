'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoggedIn, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!isLoggedIn) {
      router.replace('/login');
    } else if (!isAdmin) {
      router.replace('/');
    }
  }, [isAdmin, isLoggedIn, ready, router]);

  if (!ready) return null;

  return <>{children}</>;
}
