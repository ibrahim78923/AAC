import { useGetAuthAccountsForOperationsReportsQuery } from '@/services/airOperations/reports';
import { reportsTypesDynamic } from './Reports.data';
import { useRouter } from 'next/router';
import { ReportsTypesI } from './Reports.interface';

export const useReports = () => {
  const router = useRouter();

  const { data, isLoading, isError, isFetching } =
    useGetAuthAccountsForOperationsReportsQuery?.(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );
  const reportsTypes: ReportsTypesI[] = reportsTypesDynamic(data);

  return {
    isLoading,
    isError,
    isFetching,
    reportsTypes,
    router,
  };
};
