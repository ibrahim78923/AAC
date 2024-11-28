import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { zeroPaddingRoutes } from '../Layout.data';
import useAuth from '@/hooks/useAuth';
import { getCustomerPortalRoutes } from './CustomerPortal.data';
import { usePathname } from 'next/navigation';
import { ARRAY_INDEX } from '@/constants/strings';
import { useLazyGetPublicCustomerPermissionsQuery } from '@/services/airCustomerPortal/Layout';
import { getActiveAccountSession, getSession } from '@/utils';
import { AUTH } from '@/constants';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';

export default function useCustomerPortal() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const routerPathName = useMemo(
    () =>
      pathname?.split('/')[ARRAY_INDEX?.TWO] ??
      pathname?.split('/')[ARRAY_INDEX?.ONE],
    [pathname],
  );

  const isZeroPaddingRoutes = useMemo(() => {
    return zeroPaddingRoutes?.includes(router?.pathname);
  }, [router?.pathname]);

  const { logout, user }: any = useAuth();
  const product = useMemo(() => getActiveAccountSession(), []);
  const session: any = useMemo(() => getSession(), []);
  const sessionId = session?.user?.companyId; // Direct Logged In Requester
  const companyIdStorage = product?.company?._id; // Logged In User from Service Product

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

  const customerLogoutHandler = () => {
    logout();
    localStorage?.removeItem('customerPortalPermissions');
    localStorage?.removeItem('customerPortalStyling');
    router?.replace(AUTH?.LOGIN);
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!router?.isReady) return;

      const idToUse = decryptedId || companyIdStorage || sessionId;
      if (!idToUse) {
        customerLogoutHandler?.();
        return;
      }

      try {
        const response = await getPublicCustomerPermissionsTrigger({
          id: idToUse,
        })?.unwrap();
        if (response?.data) {
          localStorage?.setItem(
            'customerPortalPermissions',
            JSON?.stringify(response?.data),
          );
        }
        if (response?.data?.customerPortalStyling) {
          localStorage?.setItem(
            'customerPortalStyling',
            JSON?.stringify(response?.data?.customerPortalStyling),
          );
        }
      } catch (error) {
        localStorage?.removeItem('customerPortalPermissions');
        localStorage?.removeItem('customerPortalStyling');
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

  const customerPortalRoutes = useMemo(() => {
    return getCustomerPortalRoutes(
      user,
      getPublicCustomerPermissionsStatus?.data?.data?.customerPortalPermissions,
    );
  }, [user, getPublicCustomerPermissionsStatus?.data]);

  const customerPortalStyling = useMemo(() => {
    return getPublicCustomerPermissionsStatus?.data?.data
      ?.customerPortalStyling;
  }, [getPublicCustomerPermissionsStatus?.data]);

  const customerPortalPermissions = useMemo(() => {
    return getPublicCustomerPermissionsStatus?.data?.data
      ?.customerPortalPermissions;
  }, [getPublicCustomerPermissionsStatus?.data]);

  const hexToRgba = useCallback((hex: string, opacity: number) => {
    hex = hex?.replace('#', '');

    if (hex?.length === 3) {
      hex = hex
        ?.split('')
        ?.map((char: string) => char + char)
        ?.join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, []);

  const reducedOpacityBgColor = useMemo(() => {
    return hexToRgba(customerPortalStyling?.iconPrimary, 0.1);
  }, [customerPortalStyling, hexToRgba]);

  const hasPermissions = useMemo(() => {
    return customerPortalPermissions?.includes(
      AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_ALLOW_SIGNUP_FROM_CS,
    );
  }, [customerPortalPermissions]);

  const isFetching = useMemo(
    () =>
      getPublicCustomerPermissionsStatus?.isLoading ||
      getPublicCustomerPermissionsStatus?.isFetching,
    [getPublicCustomerPermissionsStatus],
  );

  return {
    theme,
    user,
    customerLogoutHandler,
    companyId,
    customerPortalRoutes,
    routerPathName,
    isMobileOpen,
    setIsMobileOpen,
    isZeroPaddingRoutes,
    isMounted,
    customerPortalStyling,
    reducedOpacityBgColor,
    hasPermissions,
    isFetching,
  };
}
