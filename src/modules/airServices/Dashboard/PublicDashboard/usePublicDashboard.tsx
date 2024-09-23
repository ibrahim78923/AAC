import { useGetPublicSingleServicesDashboardQuery } from '@/services/airServices/dashboard';
import { useRouter } from 'next/router';

export const usePublicDashboard = () => {
  const router = useRouter();
  const {
    companyId,
    dashboardId,
    productId,
    createdBy,
    accountId,
    organizationId,
    filterBy = 'status',
    departmentId = null,
  } = router?.query;

  const skip =
    !companyId ||
    !dashboardId ||
    !productId ||
    !createdBy ||
    !accountId ||
    !organizationId ||
    !filterBy;

  const apiDataParameter = {
    queryParams: {
      companyId,
      dashboardId,
      productId,
      createdBy,
      accountId,
      organizationId,
      filterBy,
      ...(departmentId !== null && { departmentId }),
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetPublicSingleServicesDashboardQuery?.(apiDataParameter, {
      refetchOnMountOrArgChange: true,
      skip,
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    skip,
    filterBy,
    departmentId,
  };
};
