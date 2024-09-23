import { useGetPublicDashboardCardsTicketsQuery } from '@/services/airServices/dashboard';
import { useRouter } from 'next/router';

export const usePublicTicketStatusCount = () => {
  const router = useRouter();
  const { companyId } = router?.query;

  const skip = !companyId;

  const apiDataParameter = {
    queryParams: {
      companyId,
    },
  };

  const { data, isLoading, isFetching, isError, error } =
    useGetPublicDashboardCardsTicketsQuery(apiDataParameter, {
      refetchOnMountOrArgChange: true,
      skip,
    });
  return {
    data,
    isLoading,
    isFetching,
    isError,
    skip,
    error,
  };
};
