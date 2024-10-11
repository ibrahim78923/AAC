import { useGetAuthAccountsForOperationsReportsQuery } from '@/services/airOperations/reports';
import { reportsTypesDynamic } from './Reports.data';
import { useRouter } from 'next/router';
import { ReportsTypesI } from './Reports.interface';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import ApiErrorState from '@/components/ApiErrorState';

export const useReports = () => {
  const router = useRouter();

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

  const reportsTypes: ReportsTypesI[] = reportsTypesDynamic(productsLists);

  const checkApiStatus = () => {
    if (isLoading || isFetching) return <SkeletonCard />;
    if (isError) return <ApiErrorState canRefresh refresh={refetch} />;
    return undefined;
  };

  return {
    reportsTypes,
    router,
    checkApiStatus,
  };
};
