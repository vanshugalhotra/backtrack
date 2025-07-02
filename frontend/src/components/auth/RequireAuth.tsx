'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, ready } = useAuth();
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!ready) return;

    if (!isLoggedIn) {
      router.replace('/login');
    } else {
      setCanRender(true);
    }
  }, [isLoggedIn, ready, router]);

  if (!canRender) return null;

  return <>{children}</>;
}
