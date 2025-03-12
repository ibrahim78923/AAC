import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';

import Login from '@/modules/auth/Login';

import LoadingScreen from '@/components/LoadingScreen';
import { getSession } from '@/utils';
import { BASE_PATHS, ERROR_PAGES } from '@/constants';
import { ROLES } from '@/constants/strings';

export default function AuthGuard({ children }: any) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<any>(null);

  const {
    user,
    accessToken,
  }: { accessToken: string; refreshToken: string; user: any } = getSession();

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

  if ((!isAuthenticated || !accessToken) && basePath !== 'login') {
    if (pathname !== requestedLocation) {
      push('/login');
    }
    return <Login />;
  }

  if (
    pathname.includes(BASE_PATHS?.ORG_ADMIN) &&
    user?.role !== ROLES?.ORG_ADMIN
  ) {
    push({ pathname: ERROR_PAGES?.NOT_ALLOWED });
  }
  if (
    !pathname.includes(BASE_PATHS?.CUSTOMER_PORTAL) &&
    user?.role === ROLES?.ORG_REQUESTER
  ) {
    push({
      pathname: ERROR_PAGES?.NOT_ALLOWED,
      query: { redirect: BASE_PATHS?.CUSTOMER_PORTAL },
    });
  }

  return <>{children}</>;
}
