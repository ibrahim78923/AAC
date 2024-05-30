import { PAGINATION } from '@/config';
import {
  useGetBillingDetailsQuery,
  useGetPlanListDetailsQuery,
  useGetPlanStatsQuery,
  useGetUsersStatsQuery,
} from '@/services/superAdmin/dashboard';
import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';

const useDashboard = () => {
  const theme = useTheme<Theme>();
  const PAGE_LIMIT = 5;
  const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const { data: getUsersStats, isLoading: userStatsLoading } =
    useGetUsersStatsQuery({});
  const allUsersStats = getUsersStats?.data;
  const totalClients =
    allUsersStats?.activeClientCount + allUsersStats?.inactiveClientCount;
  const totalUsers =
    allUsersStats?.activeUserCount + allUsersStats?.inactiveUserCount;

  const { data: getPlanStats, isLoading: plansStatsLoading } =
    useGetPlanStatsQuery({});
  const planStatistics = getPlanStats?.data;

  const { data: getBillingDetails, isLoading: billingDetailsLoading } =
    useGetBillingDetailsQuery({});
  const billingDetails = getBillingDetails?.data;

  const planParams = {
    page: page,
    limit: pageLimit,
  };
  const { data: getPlanListDetails } = useGetPlanListDetailsQuery({
    params: planParams,
  });
  const plansList = getPlanListDetails?.data?.plans;

  return {
    billingDetailsLoading,
    plansStatsLoading,
    userStatsLoading,
    planStatistics,
    billingDetails,
    allUsersStats,
    totalClients,
    setPageLimit,
    totalUsers,
    plansList,
    setPage,
    theme,
  };
};

export default useDashboard;
