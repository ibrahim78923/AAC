import { AIR_OPERATIONS } from '@/constants';
import { useLazyRestoreGenericReportsListQuery } from '@/services/airOperations/reports';
import { useRouter } from 'next/router';

export const useSalesReportsRestore = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyRestoreGenericReportsListQuery?.();
  const { id } = router?.query;
  const reportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.SALES_REPORTS,
      query: {
        id,
      },
    });
  };

  return {
    router,
    apiQueryAllReports,
    reportsPath,
  };
};
