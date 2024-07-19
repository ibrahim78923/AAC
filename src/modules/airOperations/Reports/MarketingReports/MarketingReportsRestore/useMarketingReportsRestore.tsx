import { AIR_OPERATIONS } from '@/constants';
import { useLazyRestoreGenericReportsListQuery } from '@/services/airOperations/reports';
import { useRouter } from 'next/router';

export const useMarketingReportsRestore = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyRestoreGenericReportsListQuery?.();

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
