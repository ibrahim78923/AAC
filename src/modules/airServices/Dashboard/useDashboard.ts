import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { useGetDashboardNameListDropdownListForDashboardQuery } from '@/services/airServices/dashboard';
import { PAGINATION } from '@/config';
import { AIR_SERVICES } from '@/constants';
import {
  dashboardDropdownActionsDynamic,
  dashboardsListsOptionsDynamic,
} from './Dashboard.data';
import { successSnackbar } from '@/utils/api';

export const useDashboard = () => {
  const [dashboardId, setDashboardId] = useState('');
  const [apiLoader, setApiLoader] = useState<any>({});

  const router = useRouter();
  const { user }: any = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const emailToCopy = `${window?.location?.origin}${AIR_SERVICES?.DASHBOARD}${
    !!apiLoader?.data?.data?.dashboard?._id
      ? `?dashboardId=${apiLoader?.data?.data?.dashboard?._id}`
      : ''
  }`;

  const copyEmail = () => {
    navigator?.clipboard?.writeText(emailToCopy);
    successSnackbar('Link has been copied successfully.');
  };

  const dashboardsList = useGetDashboardNameListDropdownListForDashboardQuery(
    { params: { limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT } },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const dashboardsListsOptions = dashboardsListsOptionsDynamic(
    dashboardsList,
    router,
    setDashboardId,
  );

  const dashboardDropdownActions = dashboardDropdownActionsDynamic(
    setIsDrawerOpen,
    copyEmail,
  );

  return {
    dashboardId,
    setDashboardId,
    apiLoader,
    setApiLoader,
    dashboardDropdownActions,
    router,
    isDrawerOpen,
    setIsDrawerOpen,
    user,
    dashboardsListsOptions,
  };
};
