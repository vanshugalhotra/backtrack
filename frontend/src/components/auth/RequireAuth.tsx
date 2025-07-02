'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, ready, router]);

  if (!ready) return null; // avoid flash

  return <>{children}</>;
}
