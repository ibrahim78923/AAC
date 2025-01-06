import {
  AUTO_REFRESH_API_POLLING_TIME,
  AUTO_REFRESH_API_TIME_INTERVAL,
  PAGINATION,
} from '@/config';
import {
  useGetAllMarketingDashboardsQuery,
  useGetMarketingDashboardsQuery,
  useLazyGetSMarketingDashboardsListQuery,
} from '@/services/airMarketer/dasboard';
import { getSession } from '@/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AIR_MARKETER } from '../../../routesConstants/paths';
import { useApiPolling } from '@/hooks/useApiPolling';
import { useTheme } from '@mui/material';
import { DRAWER_TYPES, MANAGE_ACCESS_TYPES } from '@/constants/strings';
import { ERROR_PAGES } from '@/constants';
import { ProfileStatistics } from './StaticComponents/ProfileStatistics';
import CtaViews from './StaticComponents/CtaViews';
import ContactCustomerGraph from './StaticComponents/ContactCustomerGraph';
import FormsTable from './StaticComponents/FormsTable';
import TotalMarketingEmail from './StaticComponents/TotalMarketingEmail';

const useDashboard = () => {
  const { user }: any = getSession();
  const currentUser = user?._id;
  const router = useRouter();
  const theme = useTheme();

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
    useGetMarketingDashboardsQuery({ params: params });

  const defaultDashboard = dashboardListArray?.dynamicdashboards?.find(
    (item: any) => item?.isDefault,
  );

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

  const dashboardNotFound =
    lazyGetSingleMarketingDashboardStatus?.data?.statusCode ===
    ERROR_PAGES?.NOT_FOUND_DEFAULT;

  const apiCallInProgress =
    lazyGetSingleMarketingDashboardStatus?.isLoading ||
    lazyGetSingleMarketingDashboardStatus?.isFetching;

  const handelNavigate = () => {
    router?.push({
      pathname: `${AIR_MARKETER?.CREATE_DASHBOARD}`,
      query: { type: DRAWER_TYPES?.ADD, mode: DRAWER_TYPES?.CREATE },
    });
  };

  const disabled =
    lazyGetSingleMarketingDashboardStatus?.data?.data?.dashboard
      ?.permissions === MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL
      ? true
      : false;

  const MARKETING_DASHBOARD_WIDGETS: any = {
    Profile_Stats: 'Profile_Stats',
    ctaTotalViewsAndAdsSubmissions: 'ctaTotalViewsAndAdsSubmissions',
    newContactsAndCustomers: 'newContactsAndCustomers',
    leadCapturedForms: 'leadCapturedForms',
    totalMarketingEmail: 'totalMarketingEmail',
  };

  const AIR_MARKETER_DASHBOARD_WIDGETS_COMPONENTS = {
    [MARKETING_DASHBOARD_WIDGETS?.Profile_Stats]: ProfileStatistics,
    [MARKETING_DASHBOARD_WIDGETS?.ctaTotalViewsAndAdsSubmissions]: CtaViews,
    [MARKETING_DASHBOARD_WIDGETS?.newContactsAndCustomers]:
      ContactCustomerGraph,
    [MARKETING_DASHBOARD_WIDGETS?.leadCapturedForms]: FormsTable,
    [MARKETING_DASHBOARD_WIDGETS?.totalMarketingEmail]: TotalMarketingEmail,
  };

  return {
    dashboardLoading: lazyGetSingleMarketingDashboardStatus?.isLoading,
    AIR_MARKETER_DASHBOARD_WIDGETS_COMPONENTS,
    lazyGetSingleMarketingDashboardStatus,
    setIsShowCreateDashboardForm,
    isShowCreateDashboardForm,
    setSelectedDashboard,
    dashboardListLoading,
    selectedDashboard,
    dashboardNotFound,
    apiCallInProgress,
    defaultDashboard,
    dropdownOptions,
    handelNavigate,
    dashboardsData,
    setPageLimit,
    currentUser,
    disabled,
    timeLapse,
    setPage,
    router,
    theme,
    page,
    user,
  };
};
export default useDashboard;
