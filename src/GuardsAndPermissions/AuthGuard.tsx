import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';

import Login from '@/modules/auth/Login';

import LoadingScreen from '@/components/LoadingScreen';
import { getSession } from '@/utils';
import { BYPASS_ROUTES } from '@/constants';
import { ROLES } from '@/constants/strings';

export default function AuthGuard({ children }: any) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<any>(null);

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const pathSegments = pathname.slice(1).split('/');

  const basePath = pathSegments[0];

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

  if (pathname.includes('org-admin') && user?.role !== 'ORG_ADMIN') {
    push({ pathname: '/405' });
  }
  if (
    user?.role === ROLES.SUPER_ADMIN &&
    basePath !== 'super-admin' &&
    !BYPASS_ROUTES[basePath]
  ) {
    push({ pathname: '/405' });
  }
  if (
    !pathname.includes('air-customer-portal') &&
    user?.role === 'ORG_REQUESTER'
  ) {
    push({ pathname: '/405', query: { redirect: 'air-customer-portal' } });
  }

  return <>{children}</>;
}
