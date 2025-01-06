import {
  AIR_MARKETER_DASHBOARD,
  AIR_SALES_DASHBOARD,
  ORG_ADMIN,
} from '@/constants';
import {
  AIR_CUSTOMER_PORTAL,
  AIR_LOYALTY_PROGRAM,
  AIR_OPERATIONS,
  AIR_SERVICES,
} from '@/constants/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PreventBackNavigation = () => {
  const router = useRouter();
  const currentPath = router?.pathname;

  const enabledRoutes = [
    ORG_ADMIN?.DASHBOARD,
    AIR_MARKETER_DASHBOARD?.SINGLE_DASHBOARD,
    AIR_SALES_DASHBOARD?.SINGLE_DASHBOARD,
    AIR_SERVICES?.DASHBOARD,
    AIR_CUSTOMER_PORTAL?.DASHBOARD,
    AIR_OPERATIONS?.DASHBOARD,
    AIR_LOYALTY_PROGRAM?.DASHBOARD,
  ];

  useEffect(() => {
    const clearHistoryAndPreventBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    const preventBackNavigation = () => {
      window.history.pushState(null, '', window.location.href);
    };

    if (enabledRoutes.includes(currentPath)) {
      clearHistoryAndPreventBack();

      window.addEventListener('popstate', preventBackNavigation);
    }

    return () => {
      window.removeEventListener('popstate', preventBackNavigation);
    };
  }, [currentPath, enabledRoutes]);

  return null;
};

export default PreventBackNavigation;
