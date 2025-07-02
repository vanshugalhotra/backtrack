'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoggedIn, ready } = useAuth();
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!ready) return;

    if (!isLoggedIn) {
      router.replace('/login');
    } else if (!isAdmin) {
      router.replace('/');
    } else {
      setCanRender(true);
    }
  }, [isAdmin, isLoggedIn, ready, router]);

  if (!canRender) return null;

  return <>{children}</>;
}
