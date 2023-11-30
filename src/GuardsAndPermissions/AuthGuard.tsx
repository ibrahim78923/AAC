import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';

import Login from '@/modules/auth/Login';

import LoadingScreen from '@/components/LoadingScreen';

export default function AuthGuard({ children }: any) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<any>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      // setRequestedLocation(pathname);
      push('/login');
    }
    return <Login />;
  }

  return <>{children}</>;
}
