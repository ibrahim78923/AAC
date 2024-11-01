import { useMemo, useState } from 'react';
import { dashboardDropdownActionsDynamic } from './DashboardFilter.data';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_SERVICES } from '@/constants/routes';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';
import { useApiPolling } from '@/hooks/useApiPolling';
import { getSession } from '@/utils';
import { fullName } from '@/utils/avatarUtils';

export const useDashboardFilter = (props: any) => {
  const { apiLoader } = props;
  const router = useRouter();

  const authUserName = useMemo(() => {
    const authUser = getSession() as any;
    return fullName(authUser?.user?.firstName, authUser?.user?.lastName);
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const dashboardName = apiLoader?.data?.data?.dashboard?.name?.toLowerCase();
  const dashboardId = apiLoader?.data?.data?.dashboard?._id;

  const moveToManageDashboard = () =>
    router?.push(AIR_SERVICES?.MANAGE_DASHBOARD);

  const copyEmail = () => {
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
    dashboardName,
    moveToManageDashboard,
    timeLapse,
    authUserName,
  };
};
