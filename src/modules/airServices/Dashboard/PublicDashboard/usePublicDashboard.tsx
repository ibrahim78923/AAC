import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { useGetServicesDashboardPublicSingleServicesDashboardQuery } from '@/services/airServices/dashboard';
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
    filterBy = TICKET_GRAPH_TYPES?.STATUS,
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

  const { data, isLoading, isFetching, isError, error } =
    useGetServicesDashboardPublicSingleServicesDashboardQuery?.(
      apiDataParameter,
      {
        refetchOnMountOrArgChange: true,
        skip,
      },
    );

  const isApiCalled = !data && !error;

  return {
    data,
    isLoading,
    isFetching,
    isError,
    skip,
    filterBy,
    departmentId,
    isApiCalled,
  };
};
