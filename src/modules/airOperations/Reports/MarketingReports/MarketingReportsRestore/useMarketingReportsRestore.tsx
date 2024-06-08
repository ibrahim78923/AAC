import { AIR_OPERATIONS } from '@/constants';
import { useLazyRestoreMarketingReportsListQuery } from '@/services/airOperations/reports/marketing-reports';
import { useRouter } from 'next/router';

export const useMarketingReportsRestore = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyRestoreMarketingReportsListQuery?.();

  const reportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.MARKETING_REPORTS,
    });
  };

  return {
    router,
    apiQueryAllReports,
    reportsPath,
  };
};
