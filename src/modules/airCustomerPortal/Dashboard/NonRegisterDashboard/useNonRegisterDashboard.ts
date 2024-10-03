import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useRouter } from 'next/router';
import { useGetCustomerPortalDashboardNonRegisterDashboardQuery } from '@/services/airCustomerPortal/Dashboard/NonRegisterDashboard';
import { useTheme } from '@mui/material';

export const useNonRegisterDashboard = () => {
  const { KNOWLEDGE_BASE } = AIR_CUSTOMER_PORTAL;
  const { push } = useRouter();
  const theme = useTheme();

  const handleViewMore = () => {
    return push(KNOWLEDGE_BASE);
  };

  const { data, isLoading, isFetching } =
    useGetCustomerPortalDashboardNonRegisterDashboardQuery(null);
  const articlesData = data?.data?.articles;

  return {
    articlesData,
    handleViewMore,
    isLoading,
    isFetching,
    theme,
  };
};
