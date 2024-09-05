import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { zeroPaddingRoutes } from '../Layout.data';
import useAuth from '@/hooks/useAuth';
import { getCustomerPortalRoutes } from './CustomerPortal.data';
import { usePathname } from 'next/navigation';
import { ARRAY_INDEX } from '@/constants/strings';
import { useLazyGetPublicCustomerPermissionsQuery } from '@/services/airCustomerPortal/Layout';
import { getActiveProductSession, getSession } from '@/utils';
import { AUTH } from '@/constants';

export default function useCustomerPortal() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const routerPathName = useMemo(
    () =>
      pathname?.split('/')[ARRAY_INDEX?.TWO] ??
      pathname?.split('/')[ARRAY_INDEX?.ONE],
    [pathname],
  );

  const isZeroPaddingRoutes = zeroPaddingRoutes?.includes(router?.pathname);
  const { logout, user } = useAuth();
  const product = getActiveProductSession();
  const session: any = getSession();
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.accounts?.[ARRAY_INDEX?.ZERO]?.company?._id;

  const { companyId } = router?.query;
  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId[ARRAY_INDEX?.ZERO]
      : companyId;
    return atob(id ?? '');
  }, [companyId]);

  const [
    getPublicCustomerPermissionsTrigger,
    getPublicCustomerPermissionsStatus,
  ] = useLazyGetPublicCustomerPermissionsQuery();

  useEffect(() => {
    const fetchPermissions = async () => {
      if (router?.isReady) {
        const idToUse = decryptedId || companyIdStorage || sessionId;
        if (idToUse) {
          try {
            const response = await getPublicCustomerPermissionsTrigger({
              id: idToUse,
            })?.unwrap();
            if (response?.data) {
              localStorage?.setItem(
                'customerPortalPermissions',
                JSON?.stringify(response?.data?.customerPortalPermissions),
              );
            }
          } catch (error) {
            localStorage?.removeItem('customerPortalPermissions');
          }
        } else {
          localStorage?.removeItem('customerPortalPermissions');
          router?.replace(AUTH?.LOGIN);
        }
      }
    };

    fetchPermissions();
  }, [
    router?.isReady,
    decryptedId,
    companyIdStorage,
    sessionId,
    getPublicCustomerPermissionsTrigger,
  ]);

  const CustomerPortalRoutes = useMemo(
    () =>
      getCustomerPortalRoutes(
        user,
        getPublicCustomerPermissionsStatus?.data?.data
          ?.customerPortalPermissions,
      ),
    [user, getPublicCustomerPermissionsStatus?.data],
  );

  return {
    theme,
    router,
    user,
    logout,
    companyId,
    getPublicCustomerPermissionsStatus,
    CustomerPortalRoutes,
    routerPathName,
    isMobileOpen,
    setIsMobileOpen,
    isZeroPaddingRoutes,
  };
}
