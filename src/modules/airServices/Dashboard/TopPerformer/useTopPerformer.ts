import { useGetDashboardTopPerformerQuery } from '@/services/airServices/dashboard';

export const useTopPerformer = () => {
  const { data, isLoading, isError, isFetching } =
    useGetDashboardTopPerformerQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  return {
    data,
    isLoading,
    isError,
    isFetching,
  };
};
