import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '@/modules/auth/Login';

// components

// ----------------------------------------------------------------------

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
    return <p>Auth guard Loading . . . .</p>;
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
