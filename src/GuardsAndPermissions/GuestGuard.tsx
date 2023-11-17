import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';
import LoadingScreen from '@/components/LoadingScreen';

export default function GuestGuard({ children }: any) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;
    if (isAuthenticated) {
      push('/super-admin');
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, push, isInitialized]);

  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
