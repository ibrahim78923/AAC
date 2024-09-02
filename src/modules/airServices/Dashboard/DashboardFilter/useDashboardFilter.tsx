import { AIR_SERVICES } from '@/constants';
import { useLazyGetDashboardNameListDropdownListForDashboardQuery } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { dashboardDropdownActionsDynamic } from './DashboardFilter.data';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

export const useDashboardFilter = (props: any) => {
  const { apiLoader } = props;
  const router = useRouter();
  const auth: any = useAuth();
  const { user }: any = auth;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const apiQueryDashboardList =
    useLazyGetDashboardNameListDropdownListForDashboardQuery?.();

  const emailToCopy = `${window?.location
    ?.origin}${AIR_SERVICES?.SINGLE_DASHBOARD}${
    !!apiLoader?.data?.data?.dashboard?._id
      ? `?dashboardId=${apiLoader?.data?.data?.dashboard?._id}`
      : ''
  }`;

  const copyEmail = () => {
    if (apiLoader?.isError) {
      errorSnackbar('Dashboard link not found.');
      return;
    }
    if (!apiLoader?.data?.data?.dashboard?._id) {
      errorSnackbar('Dashboard link not found.');
      return;
    }
    navigator?.clipboard?.writeText(emailToCopy);
    successSnackbar('Link has been copied successfully.');
  };

  const dashboardDropdownActions = dashboardDropdownActionsDynamic(
    setIsDrawerOpen,
    copyEmail,
  );

  return {
    dashboardDropdownActions,
    apiQueryDashboardList,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    user,
  };
};
