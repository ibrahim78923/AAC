import { PAGINATION } from '@/config';
import {
  useGetAllSalesDashboardsQuery,
  useGetSalesDashboardsQuery,
} from '@/services/airSales/dashboard';
import { getSession } from '@/utils';
import { useState } from 'react';
import DealsGraph from './DealsGraph';
import TeamActivity from './TeamActivity';
import MeetingDetails from './MeetingDetails';
import Widget from './Widget';
const useDashboard = () => {
  const { user }: any = getSession();
  const currentUser = user?._id;

  const [isShowCreateDashboardForm, setIsShowCreateDashboardForm] =
    useState(false);
  const [isShowEditDashboard, setIsShowEditDashboard] = useState(false);
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

  const dropdownOptions = dashboardListArray?.dynamicdashboards;

  const {
    data: getDashboards,
    isLoading: dashboardLoading,
    isError: dashboardNotFound,
  } = useGetAllSalesDashboardsQuery({
    params: { page: 1, limit: 10, dashboardId: selectedDashboard },
  });

  const dashboardsData = getDashboards?.data;

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

  return {
    AIR_SALES_DASHBOARD_WIDGETS_COMPONENTS,
    setIsShowCreateDashboardForm,
    isShowCreateDashboardForm,
    setIsShowEditDashboard,
    setSelectedDashboard,
    dashboardListLoading,
    isShowEditDashboard,
    dashboardListArray,
    dashboardNotFound,
    selectedDashboard,
    dashboardLoading,
    dropdownOptions,
    dashboardsData,
    setPageLimit,
    setPage,
  };
};
export default useDashboard;
