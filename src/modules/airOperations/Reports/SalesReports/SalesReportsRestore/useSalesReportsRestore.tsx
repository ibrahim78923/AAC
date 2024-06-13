import { AIR_OPERATIONS } from '@/constants';
import { useLazyRestoreSalesReportsListQuery } from '@/services/airOperations/reports/sales-reports';
import { useRouter } from 'next/router';

export const useSalesReportsRestore = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyRestoreSalesReportsListQuery?.();

  const reportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.SALES_REPORTS,
    });
  };

  return {
    router,
    apiQueryAllReports,
    reportsPath,
  };
};
