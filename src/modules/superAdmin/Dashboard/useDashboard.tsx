import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useGetBillingDetailsQuery,
  useGetEnquiriesDetailsQuery,
  useGetPlanListDetailsQuery,
  useGetPlanStatsQuery,
  useGetUsersStatsQuery,
} from '@/services/superAdmin/dashboard';

const useDashboard = () => {
  const theme = useTheme<Theme>();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.OPTIONAL_PAGE_LIMIT);
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

  const { data: getEnquiriesDetails } = useGetEnquiriesDetailsQuery({});
  const enquiriesDetails = getEnquiriesDetails?.data;

  const planParams = {
    page: page,
    limit: pageLimit,
  };
  const { data: getPlanListDetails, isLoading: enquiriesDataLoading } =
    useGetPlanListDetailsQuery({
      params: planParams,
    });
  const plansList = getPlanListDetails?.data?.plans;

  return {
    billingDetailsLoading,
    enquiriesDataLoading,
    plansStatsLoading,
    userStatsLoading,
    enquiriesDetails,
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
