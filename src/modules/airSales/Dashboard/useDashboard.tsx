import { useRef, useState } from 'react';
import {
  AUTO_REFRESH_API_POLLING_TIME,
  AUTO_REFRESH_API_TIME_INTERVAL,
  PAGINATION,
} from '@/config';
import {
  useGetAllSalesDashboardsQuery,
  useGetSalesDashboardsQuery,
  useLazyGetSalesDashboardsListQuery,
} from '@/services/airSales/dashboard';
import { getSession } from '@/utils';
import DealsGraph from './DealsGraph';
import TeamActivity from './TeamActivity';
import MeetingDetails from './MeetingDetails';
import Widget from './Widget';
import { useTheme } from '@mui/material';
import { AIR_SALES } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
import { useApiPolling } from '@/hooks/useApiPolling';
import { MANAGE_ACCESS_TYPES } from '@/constants/strings';
import { ERROR_PAGES } from '@/constants';
const useDashboard = () => {
  const theme = useTheme();
  const { user }: any = getSession();
  const currentUser = user?._id;
  const router = useRouter();
  const downloadRef = useRef(null);
  const [isShowCreateDashboardForm, setIsShowCreateDashboardForm] =
    useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page,
    limit: pageLimit,
    owner: currentUser,
  };
  const { data: dashboardListArray, isLoading: dashboardListLoading } =
    useGetSalesDashboardsQuery({ params: params });

  const dropdownOptions = useLazyGetSalesDashboardsListQuery();

  const defaultDashboard = dashboardListArray?.dynamicdashboards?.find(
    (item: any) => item?.isDefault,
  );

  const dashboardParams = { params: { dashboardId: selectedDashboard } };

  const lazyGetSingleSalesDashboardStatus = useGetAllSalesDashboardsQuery?.(
    dashboardParams,
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: AUTO_REFRESH_API_POLLING_TIME?.DASHBOARD,
    },
  );

  const dashboardNotFound =
    lazyGetSingleSalesDashboardStatus?.data?.statusCode ===
    ERROR_PAGES?.NOT_FOUND_DEFAULT;

  const ApiPollingHookProps = {
    isFetching: lazyGetSingleSalesDashboardStatus?.isFetching,
    fulfilledTimeStamp: lazyGetSingleSalesDashboardStatus?.fulfilledTimeStamp,
    intervalTime: AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD,
  };

  const { timeLapse } = useApiPolling(ApiPollingHookProps);

  const dashboardsData = lazyGetSingleSalesDashboardStatus?.data?.data;

  const apiCallInProgress =
    lazyGetSingleSalesDashboardStatus?.isLoading ||
    lazyGetSingleSalesDashboardStatus?.isFetching;

  const SALES_DASHBOARD_WIDGETS: any = {
    DEALS_CREATED_VS_CLOSED_DEALS: 'DEALS_CREATED_VS_CLOSED_DEALS',
    TEAM_ACTIVITIES_BY_ACTIVITY_DATE: 'TEAM_ACTIVITIES_BY_ACTIVITY_DATE',
    MEETING_DETAILS: 'MEETING_DETAILS',
    TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES:
      'TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES',
  };

  const AIR_SALES_DASHBOARD_WIDGETS_COMPONENTS = {
    [SALES_DASHBOARD_WIDGETS?.DEALS_CREATED_VS_CLOSED_DEALS]: DealsGraph,
    [SALES_DASHBOARD_WIDGETS?.TEAM_ACTIVITIES_BY_ACTIVITY_DATE]: TeamActivity,
    [SALES_DASHBOARD_WIDGETS?.MEETING_DETAILS]: MeetingDetails,
    [SALES_DASHBOARD_WIDGETS?.TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES]:
      Widget,
  };

  const handelNavigate = () => {
    router?.push({
      pathname: `${AIR_SALES?.MANAGE_DASHBOARD}`,
    });
  };

  const disabled =
    lazyGetSingleSalesDashboardStatus?.data?.data?.dashboard?.permissions ===
    MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL
      ? true
      : false;

  return {
    dashboardLoading: lazyGetSingleSalesDashboardStatus?.isLoading,
    AIR_SALES_DASHBOARD_WIDGETS_COMPONENTS,
    lazyGetSingleSalesDashboardStatus,
    setIsShowCreateDashboardForm,
    isShowCreateDashboardForm,
    setSelectedDashboard,
    dashboardListLoading,
    dashboardListArray,
    dashboardNotFound,
    selectedDashboard,
    defaultDashboard,
    apiCallInProgress,
    dropdownOptions,
    dashboardsData,
    handelNavigate,
    setPageLimit,
    timeLapse,
    disabled,
    setPage,
    router,
    theme,
    user,
    downloadRef,
  };
};
export default useDashboard;
