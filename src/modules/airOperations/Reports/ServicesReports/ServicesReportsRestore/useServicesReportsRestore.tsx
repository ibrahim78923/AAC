import { AIR_OPERATIONS } from '@/constants';
import { useLazyRestoreGenericReportsListQuery } from '@/services/airOperations/reports';
import { useRouter } from 'next/router';

export const useServicesReportsRestore = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyRestoreGenericReportsListQuery?.();

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
