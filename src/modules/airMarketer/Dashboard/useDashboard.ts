import {
  AUTO_REFRESH_API_POLLING_TIME,
  AUTO_REFRESH_API_TIME_INTERVAL,
  PAGINATION,
} from '@/config';
import {
  useGetAllMarketingDashboardsQuery,
  useLazyGetSMarketingDashboardsListQuery,
} from '@/services/airMarketer/dasboard';
import { getSession } from '@/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AIR_MARKETER } from '../../../routesConstants/paths';
import { useApiPolling } from '@/hooks/useApiPolling';
import { useTheme } from '@mui/material';

const useDashboard = () => {
  const { user }: any = getSession();
  const currentUser = user?._id;
  const router = useRouter();
  const theme = useTheme();

  const [isShowCreateDashboardForm, setIsShowCreateDashboardForm] =
    useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const dropdownOptions = useLazyGetSMarketingDashboardsListQuery();

  const dashboardParams = { params: { dashboardId: selectedDashboard } };

  const lazyGetSingleMarketingDashboardStatus =
    useGetAllMarketingDashboardsQuery?.(dashboardParams, {
      refetchOnMountOrArgChange: true,
      pollingInterval: AUTO_REFRESH_API_POLLING_TIME?.DASHBOARD,
    });

  const ApiPollingHookProps = {
    isFetching: lazyGetSingleMarketingDashboardStatus?.isFetching,
    fulfilledTimeStamp:
      lazyGetSingleMarketingDashboardStatus?.fulfilledTimeStamp,
    intervalTime: AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD,
  };

  const { timeLapse } = useApiPolling(ApiPollingHookProps);

  const dashboardsData = lazyGetSingleMarketingDashboardStatus?.data?.data;

  const apiCallInProgress =
    lazyGetSingleMarketingDashboardStatus?.isLoading ||
    lazyGetSingleMarketingDashboardStatus?.isFetching;

  const handelNavigate = () => {
    router?.push({
      pathname: `${AIR_MARKETER?.CREATE_DASHBOARD}`,
      query: { type: 'add' },
    });
  };

  return {
    dashboardNotFound: lazyGetSingleMarketingDashboardStatus?.isError,
    dashboardLoading: lazyGetSingleMarketingDashboardStatus?.isLoading,
    lazyGetSingleMarketingDashboardStatus,
    setIsShowCreateDashboardForm,
    isShowCreateDashboardForm,
    setSelectedDashboard,
    selectedDashboard,
    apiCallInProgress,
    handelNavigate,
    dropdownOptions,
    dashboardsData,
    currentUser,
    timeLapse,
    setPage,
    router,
    theme,
    page,
    user,
  };
};
export default useDashboard;
