import { useState } from 'react';
import { dashboardDropdownActionsDynamic } from './DashboardFilter.data';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_SERVICES } from '@/constants/routes';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';
import { useApiPolling } from '@/hooks/useApiPolling';

export const useDashboardFilter = (props: any) => {
  const { apiLoader } = props;
  const router = useRouter();
  const auth: any = useAuth();
  const { user }: any = auth;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const apiCallInProgress = apiLoader?.isLoading || apiLoader?.isFetching;
  const dashboardName = apiLoader?.data?.data?.dashboard?.name?.toLowerCase();
  const dashboardId = apiLoader?.data?.data?.dashboard?._id;
  const refetch = apiLoader?.refetch;
  const moveToManageDashboard = () =>
    router?.push(AIR_SERVICES?.MANAGE_DASHBOARD);

  const copyEmail = () => {
    if (apiLoader?.isError) {
      errorSnackbar('Dashboard link not found.');
      return;
    }
    if (!dashboardId) {
      errorSnackbar('Dashboard link not found.');
      return;
    }
    const emailToCopy = `${window?.location?.origin}${AIR_SERVICES?.SINGLE_DASHBOARD}?dashboardId=${dashboardId}`;
    navigator?.clipboard?.writeText(emailToCopy);
    successSnackbar('Link has been copied successfully.');
  };

  const dashboardDropdownActions = dashboardDropdownActionsDynamic(
    setIsDrawerOpen,
    copyEmail,
  );

  const ApiPollingHookProps = {
    isFetching: apiLoader?.isFetching,
    fulfilledTimeStamp: apiLoader?.fulfilledTimeStamp,
    intervalTime: AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD,
  };

  const { timeLapse } = useApiPolling(ApiPollingHookProps);

  return {
    dashboardDropdownActions,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    user,
    apiCallInProgress,
    dashboardName,
    moveToManageDashboard,
    refetch,
    timeLapse,
  };
};
