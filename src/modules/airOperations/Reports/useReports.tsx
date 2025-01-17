import { useGetAuthAccountsForOperationsReportsQuery } from '@/services/airOperations/reports';
import { reportsTypesDynamic } from './Reports.data';

export const useReports = () => {
  const { data, isLoading, isError, isFetching, refetch } =
    useGetAuthAccountsForOperationsReportsQuery?.(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const productsLists = data?.data?.reduce(
    (acc: any, account: any) => ({
      ...acc,
      [account?.name]: {
        hasAccount: account?.accounts?.length,
        productId: account?._id,
      },
    }),
    {},
  );

  const reportsTypes = reportsTypesDynamic(productsLists);

  return {
    reportsTypes,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};
