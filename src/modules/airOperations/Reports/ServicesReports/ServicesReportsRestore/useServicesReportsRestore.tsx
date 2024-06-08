import { AIR_OPERATIONS } from '@/constants';
import { useLazyRestoreServicesReportsListQuery } from '@/services/airOperations/reports/services-reports';
import { useRouter } from 'next/router';

export const useServicesReportsRestore = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyRestoreServicesReportsListQuery?.();

  const reportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.SERVICES_REPORTS,
    });
  };

  return {
    router,
    apiQueryAllReports,
    reportsPath,
  };
};
